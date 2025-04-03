"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

export function SeedButton() {
  const [isSeeding, setIsSeeding] = useState(false)

  const handleSeed = async () => {
    setIsSeeding(true)

    try {
      const response = await fetch("/api/seed", {
        method: "POST",
      })

      const data = await response.json()

      if (response.ok) {
        toast.success(data.message || "Database seeded successfully")
      } else {
        toast.error(data.error || "Failed to seed database")

      }
    } catch (error) {
      console.error("Error seeding database:", error)
      toast.error("Failed to seed database")
    } finally {
      setIsSeeding(false)
    }
  }

  return (
    <Button onClick={handleSeed} disabled={isSeeding} variant="outline">
      {isSeeding ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Seeding...
        </>
      ) : (
        "Seed Database"
      )}
    </Button>
  )
}

