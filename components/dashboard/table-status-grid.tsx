"use client"

import { useQuery } from "@tanstack/react-query"
import { Card, CardContent } from "@/components/ui/card"

interface TableStatusGridProps {
  date: Date
}

const TABLE_STATUS_COLORS = {
  AVAILABLE: "bg-green-100 border-green-300 text-green-800",
  BOOKED: "bg-blue-100 border-blue-300 text-blue-800",
  SEATED: "bg-yellow-100 border-yellow-300 text-yellow-800",
  DIRTY: "bg-red-100 border-red-300 text-red-800",
  RESERVED: "bg-purple-100 border-purple-300 text-purple-800",
  OUT_OF_SERVICE: "bg-gray-100 border-gray-300 text-gray-800",
}

export function TableStatusGrid({ date }: TableStatusGridProps) {
  const { data: tables, isLoading } = useQuery({
    queryKey: ["tables", "status", date],
    queryFn: async () => {
      const { getTables } = await import("@/lib/services/tables")
      return await getTables({
        date: date.toISOString().split('T')[0],
      })
    },
  })

  if (isLoading) {
    return <div>Loading tables...</div>
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {tables?.map((table: any) => (
          <Card
            key={table.id}
            className={`border-2 ${TABLE_STATUS_COLORS[table.status as keyof typeof TABLE_STATUS_COLORS] || TABLE_STATUS_COLORS.AVAILABLE}`}
          >
            <CardContent className="p-4">
              <div className="font-semibold">{table.name}</div>
              <div className="text-sm">Capacity: {table.capacity}</div>
              <div className="text-xs mt-1">{table.status}</div>
              {table.currentBooking && (
                <div className="text-xs mt-2">
                  <div>{table.currentBooking.guestName}</div>
                  <div>{table.currentBooking.time}</div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex gap-4 flex-wrap">
        {Object.entries(TABLE_STATUS_COLORS).map(([status, color]) => (
          <div key={status} className="flex items-center gap-2">
            <div className={`w-4 h-4 rounded ${color}`} />
            <span className="text-sm">{status}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

