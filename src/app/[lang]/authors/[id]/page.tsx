import Link from "next/link"
import { QuoteCard } from "@/components/quote-card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { ArrowLeft } from "lucide-react"
import { getDictionary } from "@/dictionaries"
import { getAuthorById, getQuotesByAuthor } from "@/lib/data"
import { notFound } from "next/navigation"
import type { Metadata, ResolvingMetadata } from 'next'
 
type AuthorPageProps = {
  params: Promise<{ lang: string,id: string }>
}
 

export async function generateMetadata(
  { params }: AuthorPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // Ensure params.lang exists
  const { lang = "en" } = await params ?? {};
  const dict = await getDictionary(lang)
  const { id } = await params;
  const author = await getAuthorById(id, lang)

  if (!author) {
    return {
      title: dict.authors.notFound,
    }
  }

  return {
    title: `${dict.authors.quotesBy} ${author.name}`,
    description: `${dict.authors.exploreQuotesBy} ${author.name}`,
    openGraph: {
      title: `${dict.authors.quotesBy} ${author.name}`,
      description: `${dict.authors.exploreQuotesBy} ${author.name}`,
      type: "profile",
    },
  }
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  // Ensure params.lang exists
  const { lang = "en" } = await params ?? {};
  const dict = await getDictionary(lang)
  const { id } = await params;
  const author = await getAuthorById(id, lang)

  if (!author) {
    notFound()
  }

  const quotes = await getQuotesByAuthor(id, lang)

  return (
    <div className="container mx-auto py-8 md:py-16 px-4">
      <div className="flex flex-wrap gap-3 items-center mb-6 md:mb-8">
        <Link href={`/${lang}`}>
          <Button variant="outline" size="sm" className="h-9">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {dict.navigation.backToHome}
          </Button>
        </Link>

        <Link href={`/${lang}/authors`}>
          <Button variant="outline" size="sm" className="h-9">
            {dict.navigation.allAuthors}
          </Button>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row items-center md:items-start gap-4 mb-8">
        <Avatar className="h-24 w-24 rounded-lg">
          <AvatarImage src={author.avatar} alt={author.name} className="object-cover" />
          <AvatarFallback className="text-2xl rounded-lg">{author.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">{author.name}</h1>
          <p className="text-muted-foreground mt-2">
            {quotes.length} {quotes.length === 1 ? dict.authors.quote : dict.authors.quotes}
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {quotes.map((quote) => (
          <QuoteCard key={quote.id} quote={quote} lang={lang} dictionary={dict.quotes} hideAuthor />
        ))}
      </div>

      {quotes.length === 0 && <p className="text-center text-muted-foreground py-8">{dict.authors.noQuotes}</p>}
    </div>
  )
}

