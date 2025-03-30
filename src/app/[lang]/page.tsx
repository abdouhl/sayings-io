import { QuoteProvider } from "@/components/quote-provider"
import { Pagination } from "@/components/pagination"
import { getDictionary } from "@/dictionaries"
import { getQuotes } from "@/lib/data"
import type { Metadata, ResolvingMetadata } from 'next'
 
type HomePageProps = {
  params: Promise<{ lang: string}>
  searchParams: Promise<{ page: string}>
}
 

export async function generateMetadata(
  { params, searchParams }: HomePageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // Ensure params.lang exists
  const { lang = "en" } = await params ?? {};
  const dict = await getDictionary(lang)

  return {
    title: dict.home.title,
    description: dict.home.description,
    alternates: {
      canonical: `/${lang}`,
      languages: {
        en: "/en",
        es: "/es",
        ar: "/ar",
      },
    },
    openGraph: {
      title: dict.home.title,
      description: dict.home.description,
      type: "website",
      locale: lang,
    },
    twitter: {
      card: "summary_large_image",
      title: dict.home.title,
      description: dict.home.description,
    },
  }
}

export default async function Home({ params, searchParams }: HomePageProps) {
  // Ensure params.lang exists
  const { lang = "en" } = await params ?? {};
  const dict = await getDictionary(lang)
  const quotes = await getQuotes(lang)
  const { page = "1" } = await searchParams ?? {};

  // Handle pagination
  const currentPage = Number.parseInt(page)
  const quotesPerPage = 6
  const totalPages = Math.ceil(quotes.length / quotesPerPage)

  // Get quotes for current page
  const startIndex = (currentPage - 1) * quotesPerPage
  const endIndex = startIndex + quotesPerPage
  const paginatedQuotes = quotes.slice(startIndex, endIndex)

  return (
    <div className="container mx-auto py-6 md:py-8 px-4">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center">{dict.home.title}</h1>

      <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">{dict.home.description}</p>

      {/* Use the QuoteProvider to fetch and render quotes */}
      <QuoteProvider lang={lang} currentPage={currentPage} quotesPerPage={quotesPerPage} />

      <div className="mt-8 md:mt-12">
        <Pagination currentPage={currentPage} totalPages={totalPages} lang={lang} dictionary={dict.pagination} />
      </div>
    </div>
  )
}

