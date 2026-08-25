const Ticket = require('../models/Ticket');

async function generateTicketId() {
  const count = await Ticket.countDocuments();
  const formattedNumber = String(count + 1).padStart(4, '0');
  return `TKT-${formattedNumber}`;
}

module.exports = generateTicketId;