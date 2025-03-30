"use client"

import { useModal } from "@/contexts/modal-context"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Quote } from "lucide-react"
import Link from "next/link"
import { ShareButtons } from "@/components/share-buttons"

export function QuoteModal() {
  const { isOpen, quote, lang, dictionary, closeModal } = useModal()

  if (!quote) return null

  // Create the URL for sharing
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://quotes-website.com"
  const quoteUrl = `${baseUrl}/${lang}/quotes/${quote.id}`

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeModal()}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="sr-only">Quote Details</DialogTitle>
        </DialogHeader>

        <div className="py-4">
          {/* Quote icon */}
          <div className="flex justify-center mb-6">
            <div className="bg-primary/10 p-4 rounded-full">
              <Quote className="h-6 w-6 text-primary" />
            </div>
          </div>

          {/* Quote text */}
          <blockquote className="text-xl md:text-2xl font-serif italic text-center mb-8 leading-relaxed">
            "{quote.text}"
          </blockquote>

          {/* Author info */}
          <div className="flex flex-col items-center gap-4 mb-8">
            <Avatar className="h-16 w-16 rounded-lg">
              <AvatarImage src={quote.author.avatar} alt={quote.author.name} className="object-cover" />
              <AvatarFallback className="rounded-lg text-lg">{quote.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <Link
              href={`/${lang}/authors/${quote.author.id}`}
              className="text-lg md:text-xl font-medium hover:underline"
            >
              — {quote.author.name}
            </Link>
          </div>

          {/* Share buttons */}
          <ShareButtons
            quoteText={quote.text}
            authorName={quote.author.name}
            quoteUrl={quoteUrl}
            dictionary={dictionary}
          />

          {/* View full page link */}
          <div className="mt-6 text-center">
            <Link href={`/${lang}/quotes/${quote.id}`} onClick={() => closeModal()} className="text-sm text-primary hover:underline">
              View full page
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

