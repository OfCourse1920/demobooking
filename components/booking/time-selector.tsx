"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useQuery } from "@tanstack/react-query"

interface TimeSelectorProps {
  date: Date
  partySize: number
  selectedTime: string | null
  onTimeSelect: (time: string) => void
}

const TIME_SLOTS = [
  "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
  "14:00", "14:30", "15:00", "17:00", "17:30", "18:00",
  "18:30", "19:00", "19:30", "20:00", "20:30", "21:00",
  "21:30", "22:00"
]

export function TimeSelector({ date, partySize, selectedTime, onTimeSelect }: TimeSelectorProps) {
  const [availableTimes, setAvailableTimes] = useState<string[]>(TIME_SLOTS)

  useEffect(() => {
    // Fetch available times from Supabase
    const fetchAvailableTimes = async () => {
      try {
        const { getAvailableTimes } = await import("@/lib/services/availability")
        const times = await getAvailableTimes({
          date: date.toISOString().split('T')[0],
          partySize,
        })
        setAvailableTimes(times.length > 0 ? times : TIME_SLOTS)
      } catch (error) {
        console.error("Error fetching availability:", error)
      }
    }

    fetchAvailableTimes()
  }, [date, partySize])

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Select Time</h3>
      <div className="grid grid-cols-4 md:grid-cols-5 gap-2">
        {TIME_SLOTS.map((time) => {
          const isAvailable = availableTimes.includes(time)
          const isSelected = selectedTime === time

          return (
            <Button
              key={time}
              variant={isSelected ? "default" : "outline"}
              disabled={!isAvailable}
              onClick={() => isAvailable && onTimeSelect(time)}
              className={!isAvailable ? "opacity-50 cursor-not-allowed" : ""}
            >
              {time}
            </Button>
          )
        })}
      </div>
      {availableTimes.length === 0 && (
        <p className="text-sm text-muted-foreground">
          No available times for this date. Please try another date or join the waitlist.
        </p>
      )}
    </div>
  )
}

