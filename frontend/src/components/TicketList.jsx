import React from 'react';

const getStatusBadgeClass = (status) => {
  switch (status) {
    case 'Open':
      return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    case 'In Progress':
      return 'bg-amber-100 text-amber-800 border-amber-200';
    case 'Closed':
      return 'bg-slate-100 text-slate-700 border-slate-200';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

// Helper function to calculate if a ticket has breached a 24-hour SLA
const checkIsUrgent = (status, createdAt) => {
  if (status !== 'Open') return false;
  
  const createdDate = new Date(createdAt);
  const now = new Date();
  const hoursDifference = (now - createdDate) / (1000 * 60 * 60);
  
  return hoursDifference > 24;
};

export default function TicketList({ tickets, onSelectTicket }) {
  if (tickets.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border p-12 text-center text-gray-500">
        No tickets found matching your query.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-gray-50 border-b text-xs font-semibold uppercase text-gray-500">
            <tr>
              <th className="px-6 py-3">Ticket ID</th>
              <th className="px-6 py-3">Customer</th>
              <th className="px-6 py-3">Subject</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Created</th>
              <th className="px-6 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {tickets.map((t) => {
              const isUrgent = checkIsUrgent(t.status, t.created_at);
              
              return (
                <tr key={t.ticket_id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="px-6 py-4 font-semibold text-indigo-600">{t.ticket_id}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{t.customer_name}</td>
                  <td className="px-6 py-4 text-gray-700 max-w-xs truncate">
                    {t.subject}
                    {/* Urgency Badge injected here */}
                    {isUrgent && (
                      <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-700 border border-red-200">
                        ⚠️ URGENT
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getStatusBadgeClass(t.status)}`}>
                      {t.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {new Date(t.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => onSelectTicket(t.ticket_id)}
                      className="text-indigo-600 hover:text-indigo-900 font-medium"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}