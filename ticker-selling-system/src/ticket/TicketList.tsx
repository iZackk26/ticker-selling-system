import React, { useState } from "react"
import TicketItem, { TicketData } from "./TicketItem"
import { Button } from "./TicketButton"
import { Input } from "./InputBar"
import { SearchIcon } from "./search/SearchIcon"

// Datos simulados de tickets
const tickets: TicketData[] = [
  { id: 1, name: "Concert A", redeemed: false, number: "T001" },
  { id: 2, name: "Movie B", redeemed: true, number: "T002" },
  { id: 3, name: "Theater C", redeemed: false, number: "T003" },
  { id: 4, name: "Sports Event D", redeemed: true, number: "T004" },
  { id: 5, name: "Exhibition E", redeemed: false, number: "T005" },
]

type FilterType = "all" | "redeemed" | "not-redeemed"

export default function TicketList() {
  const [filter, setFilter] = useState<FilterType>("all")
  const [search, setSearch] = useState("")

  const filteredTickets = tickets.filter((ticket) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "redeemed" && ticket.redeemed) ||
      (filter === "not-redeemed" && !ticket.redeemed)
    const matchesSearch = ticket.number.toLowerCase().includes(search.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const filterButtons: { label: string; value: FilterType }[] = [
    { label: "All", value: "all" },
    { label: "Redeemed", value: "redeemed" },
    { label: "Not Redeemed", value: "not-redeemed" },
  ]

  return (
    <div className="p-4">
      <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2 justify-center">
          {filterButtons.map((button) => (
            <Button
              key={button.value}
              onClick={() => setFilter(button.value)}
              variant={filter === button.value ? "default" : "outline"}
              className="min-w-[120px]"
              aria-pressed={filter === button.value}
            >
              {button.label}
            </Button>
          ))}
        </div>
        <div className="relative w-full sm:w-auto">
          <Input
            type="text"
            placeholder="Search ticket number"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 outline outline-transparent"
          />
          <SearchIcon
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTickets.map((ticket) => (
          <TicketItem key={ticket.id} ticket={ticket} />
        ))}
      </div>
      {filteredTickets.length === 0 && (
        <p className="text-center text-gray-500 mt-8">
          No tickets found matching your criteria.
        </p>
      )}
    </div>
  )
}
