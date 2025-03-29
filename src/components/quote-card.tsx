import Link from "next/link"
import type { Quote } from "@/types/quote"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { rtlLocales } from "@/middleware"

interface QuoteCardProps {
  quote: Quote
  lang: string
  dictionary: {
    quoteBy: string
    [key: string]: string
  }
  hideAuthor?: boolean
}

export function QuoteCard({ quote, lang, dictionary, hideAuthor = false }: QuoteCardProps) {
  // Safely check if lang is defined before using it
  const isRtl = lang && rtlLocales.includes(lang)

  return (
    <Card className="h-full flex flex-col">
      <CardContent className="pt-6 flex-1">
        <Link href={`/${lang}/quotes/${quote.id}`} className="block group">
          <blockquote
            className={`text-base md:text-lg font-serif italic group-hover:underline ${isRtl ? "text-right" : ""}`}
          >
            "{quote.text}"
          </blockquote>
        </Link>
      </CardContent>
      {!hideAuthor && (
        <CardFooter className="border-t pt-4 flex items-center gap-3">
          <Avatar className="h-8 w-8 rounded-md">
            <AvatarImage src={quote.author.avatar} alt={quote.author.name} className="object-cover" />
            <AvatarFallback className="rounded-md">{quote.author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <Link
            href={`/${lang}/authors/${quote.author.id}`}
            className={`text-sm font-medium hover:underline ${isRtl ? "mr-auto" : "ml-auto"}`}
            title={`${dictionary.quoteBy} ${quote.author.name}`}
          >
            — {quote.author.name}
          </Link>
        </CardFooter>
      )}
    </Card>
  )
}

