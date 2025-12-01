"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DatePicker } from "@/components/booking/date-picker"
import { TimeSelector } from "@/components/booking/time-selector"
import { PartySizeSelector } from "@/components/booking/party-size-selector"
import { TableSelector } from "@/components/booking/table-selector"
import { GuestInfoForm } from "@/components/booking/guest-info-form"
import { SpecialRequests } from "@/components/booking/special-requests"
import { useToast } from "@/components/ui/use-toast"

type BookingStep = "date" | "time" | "party" | "table" | "guest" | "requests" | "confirm"

export function BookingFlow() {
  const [step, setStep] = useState<BookingStep>("date")
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [partySize, setPartySize] = useState<number>(2)
  const [selectedTable, setSelectedTable] = useState<string | null>(null)
  const [guestInfo, setGuestInfo] = useState({
    name: "",
    email: "",
    phone: "",
  })
  const [specialRequests, setSpecialRequests] = useState<string>("")
  const { toast } = useToast()

  const handleNext = () => {
    if (step === "date" && selectedDate) {
      setStep("time")
    } else if (step === "time" && selectedTime) {
      setStep("party")
    } else if (step === "party") {
      setStep("table")
    } else if (step === "table") {
      setStep("guest")
    } else if (step === "guest" && guestInfo.name && guestInfo.email && guestInfo.phone) {
      setStep("requests")
    } else if (step === "requests") {
      setStep("confirm")
    }
  }

  const handleBack = () => {
    const steps: BookingStep[] = ["date", "time", "party", "table", "guest", "requests", "confirm"]
    const currentIndex = steps.indexOf(step)
    if (currentIndex > 0) {
      setStep(steps[currentIndex - 1])
    }
  }

  const handleSubmit = async () => {
    try {
      const { createBooking } = await import("@/lib/services/bookings")
      
      await createBooking({
        restaurantId: "demo-restaurant", // In production, get from URL or context
        date: selectedDate!.toISOString().split('T')[0],
        time: selectedTime!,
        partySize,
        tableId: selectedTable || undefined,
        guestName: guestInfo.name,
        guestEmail: guestInfo.email,
        guestPhone: guestInfo.phone,
        specialRequests: specialRequests || undefined,
      })

      toast({
        title: "Booking Confirmed!",
        description: "Your reservation has been confirmed. Check your email for details.",
      })
      // Reset form
      setStep("date")
      setSelectedDate(null)
      setSelectedTime(null)
      setPartySize(2)
      setSelectedTable(null)
      setGuestInfo({ name: "", email: "", phone: "" })
      setSpecialRequests("")
    } catch (error: any) {
      toast({
        title: "Booking Failed",
        description: error.message || "Please try again or contact the restaurant directly.",
        variant: "destructive",
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reservation Details</CardTitle>
        <CardDescription>
          Step {["date", "time", "party", "table", "guest", "requests", "confirm"].indexOf(step) + 1} of 7
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {step === "date" && (
          <DatePicker
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
          />
        )}

        {step === "time" && selectedDate && (
          <TimeSelector
            date={selectedDate}
            partySize={partySize}
            selectedTime={selectedTime}
            onTimeSelect={setSelectedTime}
          />
        )}

        {step === "party" && (
          <PartySizeSelector
            partySize={partySize}
            onPartySizeChange={setPartySize}
          />
        )}

        {step === "table" && selectedDate && selectedTime && (
          <TableSelector
            date={selectedDate}
            time={selectedTime}
            partySize={partySize}
            selectedTable={selectedTable}
            onTableSelect={setSelectedTable}
          />
        )}

        {step === "guest" && (
          <GuestInfoForm
            guestInfo={guestInfo}
            onGuestInfoChange={setGuestInfo}
          />
        )}

        {step === "requests" && (
          <SpecialRequests
            requests={specialRequests}
            onRequestsChange={setSpecialRequests}
          />
        )}

        {step === "confirm" && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Confirm Your Reservation</h3>
            <div className="space-y-2 text-sm">
              <p><strong>Date:</strong> {selectedDate?.toLocaleDateString()}</p>
              <p><strong>Time:</strong> {selectedTime}</p>
              <p><strong>Party Size:</strong> {partySize}</p>
              {selectedTable && <p><strong>Table:</strong> {selectedTable}</p>}
              <p><strong>Guest:</strong> {guestInfo.name}</p>
              <p><strong>Email:</strong> {guestInfo.email}</p>
              <p><strong>Phone:</strong> {guestInfo.phone}</p>
              {specialRequests && <p><strong>Special Requests:</strong> {specialRequests}</p>}
            </div>
          </div>
        )}

        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={step === "date"}
          >
            Back
          </Button>
          {step === "confirm" ? (
            <Button onClick={handleSubmit}>Confirm Booking</Button>
          ) : (
            <Button onClick={handleNext}>
              Next
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

