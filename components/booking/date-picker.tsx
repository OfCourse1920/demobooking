"use client"

import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"

interface DatePickerProps {
  selectedDate: Date | null
  onDateSelect: (date: Date | null) => void
}

export function DatePicker({ selectedDate, onDateSelect }: DatePickerProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Select Date</h3>
      <Card>
        <CardContent className="p-6">
          <Calendar
            mode="single"
            selected={selectedDate || undefined}
            onSelect={(date) => onDateSelect(date || null)}
            disabled={(date) => date < new Date()}
            className="rounded-md border"
          />
        </CardContent>
      </Card>
    </div>
  )
}

