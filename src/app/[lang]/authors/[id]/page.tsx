import Link from "next/link"
import { QuoteCard } from "@/components/quote-card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { ArrowLeft, Quote } from "lucide-react"
import { getDictionary } from "@/dictionaries"
import { getAuthorByUsername, getQuotesByAuthor, generateStaticParams as generateAuthorParams } from "@/lib/authors"
import { notFound } from "next/navigation"
import type { Metadata, ResolvingMetadata } from 'next'

import { Badge } from "@/components/ui/badge"
import { AuthorStructuredData } from "@/components/structured-data"

type AuthorPageProps = {
  params: Promise<{ lang: string,id: string }>
}

export const revalidate = 2592000

export async function generateStaticParams() {
  return generateAuthorParams()
}

export async function generateMetadata(
  { params }: AuthorPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // Ensure params.lang exists
  const { lang = "en" } = await params ?? {};
  const dict = await getDictionary(lang)
  const { id } = await params;
  const author = await getAuthorByUsername(id, lang)

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
  const author = await getAuthorByUsername(id, lang)

  if (!author) {
    notFound()
  }

  const quotes = await getQuotesByAuthor(id, lang)
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://yourdomain.com"
  // Generate a gradient color based on the author's name
  const getGradientColor = (name: string) => {
    const colors = [
      "from-blue-500 to-purple-500",
      "from-emerald-500 to-teal-500",
      "from-orange-500 to-amber-500",
      "from-pink-500 to-rose-500",
      "from-indigo-500 to-violet-500",
      "from-cyan-500 to-sky-500",
      "from-red-500 to-orange-500",
      "from-lime-500 to-green-500",
    ]

    // Use the sum of character codes to pick a color
    const sum = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
    return colors[sum % colors.length]
  }

  const gradientClass = getGradientColor(author.name)
  
  return (
    <>
      {/* Add structured data */}
      <AuthorStructuredData author={author} quotes={quotes} lang={lang} baseUrl={baseUrl} />

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

        <div className="max-w-4xl mx-auto mb-12">
          <div className={`bg-gradient-to-r ${gradientClass} rounded-t-lg h-4`}></div>
          <div className="bg-card border border-t-0 rounded-b-lg p-8 shadow-sm">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="relative">
                <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass} rounded-lg opacity-20`}></div>
                <Avatar className="h-32 w-32 rounded-lg border-2 border-background shadow-md">
                  <AvatarImage src={author.avatar} alt={author.name} className="object-cover" />
                  <AvatarFallback className="text-3xl rounded-lg">{author.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{author.name}</h1>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-4">
                  <Badge variant="secondary" className="text-sm">
                    {quotes.length} {quotes.length === 1 ? dict.authors.quote : dict.authors.quotes}
                  </Badge>
                </div>
                <p className="text-muted-foreground">
                  {dict.authors.exploreQuotesBy} {author.name}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Quote className="h-5 w-5 text-primary" />
            {dict.authors.quotesBy} {author.name}
          </h2>
        </div>

        {quotes.length === 0 ? (
          <div className="bg-card border rounded-lg p-12 text-center">
            <p className="text-muted-foreground">{dict.authors.noQuotes}</p>
          </div>
        ) : (
          <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {quotes.map((quote) => (
              <QuoteCard key={quote.id} quote={quote} lang={lang} dictionary={dict.quotes} hideAuthor />
            ))}
          </div>
        )}
      </div>
    </>
  )
}

