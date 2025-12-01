"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookingFlow } from "@/components/booking/booking-flow"

export default function BookPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">Book a Table</h1>
            <p className="text-gray-600 dark:text-gray-300">
              Reserve your perfect dining experience
            </p>
          </div>
          <BookingFlow />
        </div>
      </div>
    </div>
  )
}

