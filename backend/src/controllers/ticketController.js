const Ticket = require('../models/Ticket'); // adjust path as needed
const generateTicketId = require('../utils/generateTicketId');

// 1. POST /api/tickets - Create a new support ticket
exports.createTicket = async (req, res) => {
  try {
    const { customer_name, customer_email, subject, description } = req.body;

    if (!customer_name || !customer_email || !subject || !description) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const ticket_id = await generateTicketId();

    const newTicket = await Ticket.create({
      ticket_id,
      customer_name,
      customer_email,
      subject,
      description,
      // status defaults to 'Open' if your schema defines it
    });

    return res.status(201).json(newTicket);
  } catch (error) {
    console.error('Error creating ticket:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// 2. GET /api/tickets - List all tickets with optional search & filter
exports.getTickets = async (req, res) => {
  try {
    const { status, search } = req.query;

    const query = {};

    // Filter by status (only if provided and valid)
    if (status && ['Open', 'In Progress', 'Closed'].includes(status)) {
      query.status = status;
    }

    // Search across multiple fields using case‑insensitive regex
    if (search) {
      query.$or = [
        { customer_name: { $regex: search, $options: 'i' } },
        { customer_email: { $regex: search, $options: 'i' } },
        { subject: { $regex: search, $options: 'i' } },
        { ticket_id: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const tickets = await Ticket.find(query).sort({ created_at: -1 });

    return res.status(200).json(tickets);
  } catch (error) {
    console.error('Error fetching tickets:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// 3. GET /api/tickets/:ticket_id - Fetch detailed view of single ticket with notes
exports.getTicketById = async (req, res) => {
  try {
    const { ticket_id } = req.params;

    const ticket = await Ticket.findOne({ ticket_id });
    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    // The notes are already embedded in the ticket document (if schema has notes array)
    return res.status(200).json(ticket);
  } catch (error) {
    console.error('Error fetching ticket details:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// 4. PUT /api/tickets/:ticket_id - Update ticket status and add comments/notes
exports.updateTicket = async (req, res) => {
  try {
    const { ticket_id } = req.params;
    const { status, notes } = req.body;

    // Build update object
    const updateData = {};
    if (status) updateData.status = status;

    const updateQuery = {};
    if (Object.keys(updateData).length > 0) {
      updateQuery.$set = updateData;
    }

    // Push new note if provided
    if (notes && notes.trim() !== '') {
      updateQuery.$push = {
        notes: { note_text: notes, created_at: new Date() }
      };
    }

    // If nothing to update, still return success but no changes
    if (Object.keys(updateQuery).length === 0) {
      return res.status(200).json({ success: true, message: 'No updates provided' });
    }

    const updatedTicket = await Ticket.findOneAndUpdate(
      { ticket_id },
      updateQuery,
      { new: true } // return the updated document
    );

    if (!updatedTicket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    return res.status(200).json({
      success: true,
      updated_at: updatedTicket.updated_at || new Date(),
      ticket: updatedTicket
    });
  } catch (error) {
    console.error('Error updating ticket:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};