"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useQuery } from "@tanstack/react-query"

interface TableSelectorProps {
  date: Date
  time: string
  partySize: number
  selectedTable: string | null
  onTableSelect: (tableId: string) => void
}

export function TableSelector({ date, time, partySize, selectedTable, onTableSelect }: TableSelectorProps) {
  const { data: tables, isLoading } = useQuery({
    queryKey: ["tables", date, time, partySize],
    queryFn: async () => {
      const { getAvailableTables } = await import("@/lib/services/tables")
      return await getAvailableTables({
        date: date.toISOString().split('T')[0],
        time,
        partySize,
      })
    },
  })

  if (isLoading) {
    return <div>Loading available tables...</div>
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Select Table (Optional)</h3>
      <p className="text-sm text-muted-foreground">
        Choose a specific table or let us assign the best available table for your party.
      </p>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Button
          variant={selectedTable === null ? "default" : "outline"}
          onClick={() => onTableSelect("")}
          className="h-20"
        >
          Any Available Table
        </Button>
        
        {tables?.map((table: any) => (
          <Button
            key={table.id}
            variant={selectedTable === table.id ? "default" : "outline"}
            onClick={() => onTableSelect(table.id)}
            disabled={!table.available}
            className="h-20 flex flex-col"
          >
            <span className="font-semibold">{table.name}</span>
            <span className="text-xs">Seats {table.capacity}</span>
          </Button>
        ))}
      </div>

      {tables?.length === 0 && (
        <p className="text-sm text-muted-foreground">
          No tables available for this time. Would you like to join the waitlist?
        </p>
      )}
    </div>
  )
}

