import { TicketIcon } from "./search/SearchIcon"

export interface TicketData {
  id: number
  name: string
  redeemed: boolean
  number: string
}

interface TicketItemProps {
  ticket: TicketData
}

export default function TicketItem({ ticket }: TicketItemProps) {
  return (
    <div
      className={`p-4 rounded-lg shadow-md transition-transform duration-300 ${
        ticket.redeemed ? "bg-red-100 text-black" : "bg-white hover:shadow-lg hover:scale-105"
      }`}
    >
      <div className="flex items-center mb-2">
        <TicketIcon className="w-5 h-5 mr-2" />
        <h2 className="text-lg font-semibold">{ticket.name}</h2>
      </div>
      <p className="text-sm font-medium mb-1">Ticket #: {ticket.number}</p>
      <p className="text-sm font-medium">
        Status: {ticket.redeemed ? "Redeemed" : "Not Redeemed"}
      </p>
    </div>
  )
}
