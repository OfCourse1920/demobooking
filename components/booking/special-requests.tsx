"use client"

import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

interface SpecialRequestsProps {
  requests: string
  onRequestsChange: (requests: string) => void
}

const COMMON_REQUESTS = [
  "High chair needed",
  "Wheelchair accessible table",
  "Window seat preferred",
  "Birthday celebration",
  "Anniversary celebration",
  "Allergy concerns",
]

export function SpecialRequests({ requests, onRequestsChange }: SpecialRequestsProps) {
  const handleCheckboxChange = (checked: boolean, request: string) => {
    if (checked) {
      onRequestsChange(requests ? `${requests}, ${request}` : request)
    } else {
      onRequestsChange(requests.replace(new RegExp(`(, )?${request}`), ""))
    }
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Special Requests</h3>
      <div className="space-y-3">
        {COMMON_REQUESTS.map((req) => (
          <div key={req} className="flex items-center space-x-2">
            <Checkbox
              id={req}
              checked={requests.includes(req)}
              onCheckedChange={(checked) => handleCheckboxChange(checked as boolean, req)}
            />
            <Label htmlFor={req} className="font-normal cursor-pointer">
              {req}
            </Label>
          </div>
        ))}
      </div>
      <div>
        <Label htmlFor="custom-requests">Additional Requests</Label>
        <Textarea
          id="custom-requests"
          value={requests.split(", ").filter(r => !COMMON_REQUESTS.includes(r)).join(", ")}
          onChange={(e) => {
            const custom = e.target.value
            const common = COMMON_REQUESTS.filter(r => requests.includes(r)).join(", ")
            onRequestsChange(common ? `${common}, ${custom}` : custom)
          }}
          placeholder="Any other special requests or dietary restrictions..."
          rows={4}
        />
      </div>
    </div>
  )
}

