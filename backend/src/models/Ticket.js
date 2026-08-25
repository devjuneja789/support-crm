const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  note_text: { type: String, required: true },
  created_at: { type: Date, default: Date.now }
});

const ticketSchema = new mongoose.Schema({
  ticket_id: { type: String, required: true, unique: true }, // e.g. TKT-0001
  customer_name: { type: String, required: true },
  customer_email: { type: String, required: true },
  subject: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['Open', 'In Progress', 'Closed'], default: 'Open' },
  notes: [noteSchema]
}, { 
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } 
});

module.exports = mongoose.model('Ticket', ticketSchema);