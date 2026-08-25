import React, { useState, useEffect } from 'react';
import { getTickets, createTicket } from './api/ticketApi';
import SearchFilterBar from './components/SearchFilterBar';
import TicketList from './components/TicketList';
import TicketForm from './components/TicketForm';
import TicketDetailModal from './components/TicketDetailModal';

export default function App() {
  const [tickets, setTickets] = useState([]);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All');
  const [loading, setLoading] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedTicketId, setSelectedTicketId] = useState(null);

  const fetchAllTickets = async () => {
    setLoading(true);
    try {
      const data = await getTickets(status, search);
      setTickets(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchAllTickets();
    }, 250);
    return () => clearTimeout(timer);
  }, [search, status]);

  const handleCreateTicket = async (newTicketData) => {
    await createTicket(newTicketData);
    fetchAllTickets();
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
              CRM
            </div>
            <h1 className="text-xl font-bold text-gray-900">Datastraw Support CRM</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SearchFilterBar
          search={search}
          setSearch={setSearch}
          status={status}
          setStatus={setStatus}
          onOpenCreate={() => setIsCreateOpen(true)}
        />

        {loading ? (
          <div className="text-center py-12 text-gray-500 font-medium">Loading tickets...</div>
        ) : (
          <TicketList tickets={tickets} onSelectTicket={(id) => setSelectedTicketId(id)} />
        )}
      </main>

      <TicketForm
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onCreated={handleCreateTicket}
      />

      <TicketDetailModal
        ticketId={selectedTicketId}
        onClose={() => setSelectedTicketId(null)}
        onRefresh={fetchAllTickets}
      />
    </div>
  );
}