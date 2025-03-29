import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { getDictionary } from "@/dictionaries"
import { getAuthors } from "@/lib/data"
import type { Metadata, ResolvingMetadata } from 'next'
 
type AuthorsPageProps = {
  params: Promise<{ lang: string}>
}
 

export async function generateMetadata(
  { params }: AuthorsPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // Ensure params.lang exists
  const { lang = "en" } = await params ?? {};
  const dict = await getDictionary(lang)

  return {
    title: dict.authors.allAuthors,
    description: dict.authors.description,
    alternates: {
      canonical: `/${lang}/authors`,
      languages: {
        en: "/en/authors",
        es: "/es/authors",
        ar: "/ar/authors",
      },
    },
    openGraph: {
      title: dict.authors.allAuthors,
      description: dict.authors.description,
      type: "website",
      locale: lang,
      url: `/${lang}/authors`,
    },
  }
}

export default async function AuthorsPage({ params }: AuthorsPageProps) {
  // Ensure params.lang exists
  const { lang = "en" } = await params ?? {};
  const dict = await getDictionary(lang)

  const authors = await getAuthors(lang)

  return (
    <div className="container mx-auto py-8 md:py-16 px-4">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center">{dict.authors.allAuthors}</h1>

      <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">{dict.authors.description}</p>

      {/* Updated grid with more responsive breakpoints */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {authors.map((author) => (
          <Card key={author.id} className="h-full flex flex-col">
            <CardContent className="pt-6 flex-1 flex flex-col items-center text-center">
              <Avatar className="h-16 w-16 rounded-lg mb-4">
                <AvatarImage src={author.avatar} alt={author.name} className="object-cover" />
                <AvatarFallback className="text-xl rounded-lg">{author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <h2 className="text-lg md:text-xl font-bold mb-2">{author.name}</h2>
              <p className="text-muted-foreground">
                {author.quoteCount} {author.quoteCount === 1 ? dict.authors.quote : dict.authors.quotes}
              </p>
            </CardContent>
            <CardFooter className="border-t pt-4 justify-center">
              <Link
                href={`/${lang}/authors/${author.id}`}
                className="text-sm font-medium hover:underline text-primary"
                title={`${dict.authors.quotesBy} ${author.name}`}
              >
                {dict.authors.viewQuotes}
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

