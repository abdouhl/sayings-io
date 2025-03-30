"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"
import type { Quote } from "@/types/quote"

interface ModalContextType {
  isOpen: boolean
  quote: Quote | null
  lang: string
  dictionary: any
  openModal: (quote: Quote, lang: string, dictionary: any) => void
  closeModal: () => void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [quote, setQuote] = useState<Quote | null>(null)
  const [lang, setLang] = useState("en")
  const [dictionary, setDictionary] = useState<any>({})

  const openModal = (quote: Quote, lang: string, dictionary: any) => {
    setQuote(quote)
    setLang(lang)
    setDictionary(dictionary)
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  return (
    <ModalContext.Provider value={{ isOpen, quote, lang, dictionary, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  )
}

export function useModal() {
  const context = useContext(ModalContext)
  if (context === undefined) {
    throw new Error("useModal must be used within a ModalProvider")
  }
  return context
}

