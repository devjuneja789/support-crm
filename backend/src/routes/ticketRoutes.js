const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');

router.post('/tickets', ticketController.createTicket);
router.get('/tickets', ticketController.getTickets);
router.get('/tickets/:ticket_id', ticketController.getTicketById);
router.put('/tickets/:ticket_id', ticketController.updateTicket);

module.exports = router;