"use client"

import { Button } from "@/components/ui/button"

interface PartySizeSelectorProps {
  partySize: number
  onPartySizeChange: (size: number) => void
}

export function PartySizeSelector({ partySize, onPartySizeChange }: PartySizeSelectorProps) {
  const sizes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Party Size</h3>
      <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
        {sizes.map((size) => (
          <Button
            key={size}
            variant={partySize === size ? "default" : "outline"}
            onClick={() => onPartySizeChange(size)}
            className="w-full"
          >
            {size}
          </Button>
        ))}
      </div>
      <p className="text-sm text-muted-foreground">
        For parties larger than 20, please contact the restaurant directly.
      </p>
    </div>
  )
}

