"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, AlertCircle } from "lucide-react"

interface ContactFormProps {
  dictionary: {
    formName: string
    formEmail: string
    formMessage: string
    formSubmit: string
    formSuccess: string
    formError: string
    [key: string]: string
  }
  lang: string
}

export function ContactForm({ dictionary, lang }: ContactFormProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null)
  const isRtl = lang === "ar"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setSubmitStatus("success")
      // Reset form
      setName("")
      setEmail("")
      setMessage("")
    } catch (error) {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={isRtl ? "text-right" : ""}>
      <div className="space-y-4">
        <div>
          <Label htmlFor="name" className="block mb-2">
            {dictionary.formName}
          </Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className={isRtl ? "text-right" : ""}
          />
        </div>

        <div>
          <Label htmlFor="email" className="block mb-2">
            {dictionary.formEmail}
          </Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={isRtl ? "text-right" : ""}
          />
        </div>

        <div>
          <Label htmlFor="message" className="block mb-2">
            {dictionary.formMessage}
          </Label>
          <Textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows={5}
            className={isRtl ? "text-right" : ""}
          />
        </div>

        {submitStatus === "success" && (
          <Alert className="bg-green-50 text-green-800 border-green-200">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription>{dictionary.formSuccess}</AlertDescription>
          </Alert>
        )}

        {submitStatus === "error" && (
          <Alert className="bg-red-50 text-red-800 border-red-200">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription>{dictionary.formError}</AlertDescription>
          </Alert>
        )}

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "..." : dictionary.formSubmit}
        </Button>
      </div>
    </form>
  )
}

