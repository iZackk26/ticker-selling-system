import TicketList from '../ticket/TicketList'

export default function Available() {
  return (
    <main className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Current Tickets</h1>
      <TicketList />
    </main>
  )
}
