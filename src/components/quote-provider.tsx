import { getQuotes } from "@/lib/quotes"
import { getDictionary } from "@/dictionaries"
import { QuoteCard } from "@/components/quote-card"

interface QuoteProviderProps {
  lang: string
  currentPage: number
  quotesPerPage: number
}

export async function QuoteProvider({ lang, currentPage, quotesPerPage }: QuoteProviderProps) {
  const dict = await getDictionary(lang)

  try {
    const quotes = await getQuotes(lang, currentPage, quotesPerPage)

    if (quotes.length === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-muted-foreground">{dict.quotes.noQuotes || "No quotes found"}</p>
          <p className="text-muted-foreground mt-2">
            The database may not be initialized yet. Please run the seed script to populate the database.
          </p>
        </div>
      )
    }

    return (
      <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {quotes.map((quote) => (
          <QuoteCard key={quote.id} quote={quote} lang={lang} dictionary={dict.quotes} />
        ))}
      </div>
    )
  } catch (error) {
    console.error("Error in QuoteProvider:", error)
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Error loading quotes. Please try again later.</p>
        <p className="text-muted-foreground mt-2">
          The database may not be initialized yet. Please run the seed script to populate the database.
        </p>
      </div>
    )
  }
}

