import { getQuotes } from "@/lib/data"
import { getDictionary } from "@/dictionaries"
import { QuoteCard } from "@/components/quote-card"

interface QuoteProviderProps {
  lang: string
  currentPage: number
  quotesPerPage: number
}

export async function QuoteProvider({ lang, currentPage, quotesPerPage }: QuoteProviderProps) {
  const dict = await getDictionary(lang)
  const quotes = await getQuotes(lang)

  // Get quotes for current page
  const startIndex = (currentPage - 1) * quotesPerPage
  const endIndex = startIndex + quotesPerPage
  const paginatedQuotes = quotes.slice(startIndex, endIndex)

  return (
    <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {paginatedQuotes.map((quote) => (
        <QuoteCard key={quote.id} quote={quote} lang={lang} dictionary={dict.quotes} />
      ))}
    </div>
  )
}

