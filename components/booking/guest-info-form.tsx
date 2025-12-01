"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface GuestInfoFormProps {
  guestInfo: {
    name: string
    email: string
    phone: string
  }
  onGuestInfoChange: (info: { name: string; email: string; phone: string }) => void
}

export function GuestInfoForm({ guestInfo, onGuestInfoChange }: GuestInfoFormProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Guest Information</h3>
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Full Name *</Label>
          <Input
            id="name"
            value={guestInfo.name}
            onChange={(e) => onGuestInfoChange({ ...guestInfo, name: e.target.value })}
            placeholder="John Doe"
            required
          />
        </div>
        <div>
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={guestInfo.email}
            onChange={(e) => onGuestInfoChange({ ...guestInfo, email: e.target.value })}
            placeholder="john@example.com"
            required
          />
        </div>
        <div>
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
            type="tel"
            value={guestInfo.phone}
            onChange={(e) => onGuestInfoChange({ ...guestInfo, phone: e.target.value })}
            placeholder="+1 (555) 123-4567"
            required
          />
        </div>
      </div>
    </div>
  )
}

