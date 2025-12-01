"use client"

import { useQuery } from "@tanstack/react-query"
import { Card, CardContent } from "@/components/ui/card"

interface BookingTimelineProps {
  date: Date
}

export function BookingTimeline({ date }: BookingTimelineProps) {
  const { data: bookings, isLoading } = useQuery({
    queryKey: ["bookings", "timeline", date],
    queryFn: async () => {
      const { getBookings } = await import("@/lib/services/bookings")
      return await getBookings({
        date: date.toISOString().split('T')[0],
      })
    },
  })

  if (isLoading) {
    return <div>Loading timeline...</div>
  }

  const timeSlots = Array.from({ length: 24 }, (_, i) => i)

  return (
    <div className="space-y-2">
      {timeSlots.map((hour) => {
        const hourBookings = bookings?.filter((b: any) => {
          const [bookingHour] = b.time.split(":").map(Number)
          return bookingHour === hour
        }) || []

        return (
          <div key={hour} className="flex gap-4">
            <div className="w-16 text-sm font-medium">{hour}:00</div>
            <div className="flex-1 flex gap-2">
              {hourBookings.map((booking: any) => (
                <Card key={booking.id} className="flex-1">
                  <CardContent className="p-3">
                    <div className="font-semibold text-sm">{booking.guestName}</div>
                    <div className="text-xs text-muted-foreground">
                      {booking.partySize} guests • {booking.table?.name || "TBD"}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

