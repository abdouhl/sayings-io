"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Loader2, Database, CheckCircle, AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export function DatabaseInitializer() {
  const [isInitializing, setIsInitializing] = useState(false)
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const initializeDatabase = async () => {
    setIsInitializing(true)
    setStatus("loading")

    try {
      const response = await fetch("/api/seed", {
        method: "POST",
      })

      const data = await response.json()

      if (response.ok) {
        setStatus("success")
        setMessage(data.message || "Database initialized successfully")
        // Reload the page after a short delay
        setTimeout(() => {
          window.location.reload()
        }, 2000)
      } else {
        setStatus("error")
        setMessage(data.error || "Failed to initialize database")
      }
    } catch (error) {
      setStatus("error")
      setMessage("An error occurred while initializing the database")
      console.error("Error initializing database:", error)
    } finally {
      setIsInitializing(false)
    }
  }

  return (
    <Card className="max-w-md mx-auto border-2">
      <CardHeader className="space-y-1">
        <div className="flex items-center gap-2">
          <Database className="h-5 w-5 text-primary" />
          <CardTitle>Database Initialization</CardTitle>
        </div>
        <CardDescription>
          The database needs to be initialized with sample data before you can use the application.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {status === "success" && (
          <Alert className="mb-4 bg-green-50 text-green-800 border-green-200">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}

        {status === "error" && (
          <Alert className="mb-4 bg-red-50 text-red-800 border-red-200">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter>
        <Button
          onClick={initializeDatabase}
          disabled={isInitializing || status === "success"}
          className="w-full"
          size="lg"
        >
          {isInitializing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Initializing...
            </>
          ) : status === "success" ? (
            <>
              <CheckCircle className="mr-2 h-4 w-4" />
              Database Initialized
            </>
          ) : (
            <>
              <Database className="mr-2 h-4 w-4" />
              Initialize Database
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}

