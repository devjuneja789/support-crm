const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const getTickets = async (status = '', search = '') => {
  const params = new URLSearchParams();
  if (status && status !== 'All') params.append('status', status);
  if (search) params.append('search', search);

  const res = await fetch(`${API_BASE_URL}/tickets?${params.toString()}`);
  if (!res.ok) throw new Error('Failed to fetch tickets');
  return res.json();
};

export const getTicketById = async (ticket_id) => {
  const res = await fetch(`${API_BASE_URL}/tickets/${ticket_id}`);
  if (!res.ok) throw new Error('Failed to fetch ticket details');
  return res.json();
};

export const createTicket = async (ticketData) => {
  const res = await fetch(`${API_BASE_URL}/tickets`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(ticketData),
  });
  if (!res.ok) throw new Error('Failed to create ticket');
  return res.json();
};

export const updateTicket = async (ticket_id, status, notes) => {
  const res = await fetch(`${API_BASE_URL}/tickets/${ticket_id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status, notes }),
  });
  if (!res.ok) throw new Error('Failed to update ticket');
  return res.json();
};