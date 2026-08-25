import React, { useEffect, useState } from 'react';
import { getTicketById, updateTicket } from '../api/ticketApi';

export default function TicketDetailModal({ ticketId, onClose, onRefresh }) {
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('');
  const [noteText, setNoteText] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (ticketId) {
      loadDetails();
    }
  }, [ticketId]);

  const loadDetails = async () => {
    setLoading(true);
    try {
      const data = await getTicketById(ticketId);
      setTicket(data);
      setStatus(data.status);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateTicket(ticketId, status, noteText);
      setNoteText('');
      await loadDetails();
      onRefresh();
    } catch (err) {
      alert('Failed to update ticket');
    } finally {
      setSaving(false);
    }
  };

  if (!ticketId) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full p-6 my-8">
        {loading || !ticket ? (
          <div className="py-12 text-center text-gray-500">Loading details...</div>
        ) : (
          <div>
            <div className="flex justify-between items-start mb-4 border-b pb-4">
              <div>
                <span className="text-sm font-semibold text-indigo-600 uppercase tracking-wider">
                  {ticket.ticket_id}
                </span>
                <h2 className="text-2xl font-bold text-gray-800">{ticket.subject}</h2>
              </div>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl font-bold">
                &times;
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4 bg-gray-50 p-4 rounded-lg">
              <div>
                <span className="font-semibold block text-gray-800">Customer:</span>
                {ticket.customer_name} ({ticket.customer_email})
              </div>
              <div>
                <span className="font-semibold block text-gray-800">Created At:</span>
                {new Date(ticket.created_at).toLocaleString()}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-800 mb-1">Description</h3>
              <p className="text-gray-700 bg-white border p-3 rounded-lg text-sm whitespace-pre-line">
                {ticket.description}
              </p>
            </div>

            {/* Status Update & Internal Notes Form */}
            <form onSubmit={handleUpdate} className="mb-6 space-y-3 bg-indigo-50/50 p-4 rounded-lg border border-indigo-100">
              <h3 className="text-sm font-bold text-gray-800">Update Ticket & Add Note</h3>
              <div className="flex gap-4 items-center">
                <label className="text-sm font-medium text-gray-700">Status:</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="border rounded-md px-3 py-1.5 text-sm bg-white focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
              <div>
                <textarea
                  rows="2"
                  placeholder="Add an internal note or comment..."
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={saving}
                className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition"
              >
                {saving ? 'Saving...' : 'Save Updates'}
              </button>
            </form>

            {/* Notes Section */}
            <div>
              <h3 className="text-sm font-bold text-gray-800 mb-2">Activity / Internal Notes</h3>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {ticket.notes && ticket.notes.length > 0 ? (
                  ticket.notes.map((note) => (
                    <div key={note.id} className="p-3 border-l-4 border-indigo-500 bg-gray-50 rounded-r text-sm">
                      <p className="text-gray-800">{note.note_text}</p>
                      <span className="text-xs text-gray-400 block mt-1">
                        {new Date(note.created_at).toLocaleString()}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-gray-400">No internal notes added yet.</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}