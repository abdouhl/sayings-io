import { QuoteProvider } from "@/components/quote-provider"
import { Pagination } from "@/components/pagination"
import { getDictionary } from "@/dictionaries"
import { countQuotes } from "@/lib/quotes"
import type { Metadata, ResolvingMetadata } from 'next'
import { revalidationTime } from "@/lib/db"
import { DatabaseInitializer } from "@/components/database-initializer"
import { Suspense } from "react"
import { QuoteCardSkeleton } from "@/components/skeletons"

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
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://yourdomain.com"
  return {
    title: dict.home.title,
    description: dict.home.description,
    alternates: {
      canonical: `/${lang}`,
      languages: {
        en: "/en",
        es: "/es",
        ar: "/ar",
        fr: "/fr",
      },
    },
    openGraph: {
      title: dict.home.title,
      description: dict.home.description,
      type: "website",
      locale: lang,
      url: `${baseUrl}/${lang}`,
      siteName: "Sayings - Inspirational Quotes",
      images: [
        {
          url: `${baseUrl}/api/og?title=${encodeURIComponent(dict.home.title)}`,
          width: 1200,
          height: 630,
          alt: dict.home.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.home.title,
      description: dict.home.description,
      images: [`${baseUrl}/api/og?title=${encodeURIComponent(dict.home.title)}`],
    },
    keywords: ["quotes", "inspirational quotes", "wisdom", "sayings", "authors", "motivational quotes"],
  }
}

export default async function Home({ params, searchParams }: HomePageProps) {
  // Ensure params.lang exists
  const { lang = "en" } = await params ?? {};
  const dict = await getDictionary(lang)
  const { page = "1" } = await searchParams ?? {};

  // Handle pagination
  const currentPage = Number.parseInt(page)
  const quotesPerPage = 6

 // Get total quotes count for pagination
  let totalQuotes = 0
  let databaseInitialized = true

  try {
    totalQuotes = await countQuotes(lang)
    // If we get 0 quotes, the database might not be initialized
    if (totalQuotes === 0) {
      databaseInitialized = false
    }
  } catch (error) {
    console.error("Error counting quotes:", error)
    databaseInitialized = false
  }

  const totalPages = Math.max(1, Math.ceil(totalQuotes / quotesPerPage))

  return (
    <div className="container mx-auto py-6 md:py-8 px-4">
      <div className="max-w-3xl mx-auto text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{dict.home.title}</h1>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">{dict.home.description}</p>
      </div>

      {!databaseInitialized ? (
        <div className="my-12">
          <DatabaseInitializer />
        </div>
      ) : (
        <>
          <Suspense
            fallback={
              <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {Array.from({ length: quotesPerPage }).map((_, i) => (
                  <QuoteCardSkeleton key={i} />
                ))}
              </div>
            }
          >
            {/* Use the QuoteProvider to fetch and render quotes */}
            <QuoteProvider lang={lang} currentPage={currentPage} quotesPerPage={quotesPerPage} />
          </Suspense>

          <div className="mt-8 md:mt-12">
            <Pagination currentPage={currentPage} totalPages={totalPages} lang={lang} dictionary={dict.pagination} />
          </div>
        </>
      )}
    </div>
  )
}
