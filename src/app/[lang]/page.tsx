import { QuoteProvider } from "@/components/quote-provider";
import { Pagination } from "@/components/pagination";
import { getDictionary } from "@/dictionaries";
import { countQuotes } from "@/lib/quotes";
import type { Metadata, ResolvingMetadata } from "next";

import { DatabaseInitializer } from "@/components/database-initializer";
import { Suspense } from "react";
import { QuoteCardSkeleton } from "@/components/skeletons";
import { getAuthors } from "@/lib/authors";
import { getPopularTags } from "@/lib/tags";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowRight, Tag, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import HeroSection from "@/components/hero-section";

type HomePageProps = {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ page: string }>;
};

export const revalidate = 2592000;

export async function generateMetadata(
  { params, searchParams }: HomePageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // Ensure params.lang exists
  const { lang = "en" } = (await params) ?? {};
  const dict = await getDictionary(lang);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://yourdomain.com";
  return {
    title: dict.metadata.title,
    description: dict.metadata.description,
    alternates: {
      canonical: `/${lang}`,
      languages: {
        en: "/en",
        es: "/es",
        ar: "/ar",
        fr: "/fr",
        pt: "/pt",
      },
    },
    openGraph: {
      title: dict.metadata.title,
      description: dict.metadata.description,
      type: "website",
      locale: lang,
      url: `${baseUrl}/${lang}`,
      siteName: "Sayings - Inspirational Quotes",
      images: [
        {
          url: `${baseUrl}/api/og?title=${encodeURIComponent(dict.metadata.title)}`,
          width: 1200,
          height: 630,
          alt: dict.metadata.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.metadata.title,
      description: dict.metadata.description,
      images: [
        `${baseUrl}/api/og?title=${encodeURIComponent(dict.metadata.title)}`,
      ],
    },
    keywords: [
      "quotes",
      "inspirational quotes",
      "wisdom",
      "sayings",
      "authors",
      "motivational quotes",
    ],
  };
}

export default async function Home({ params, searchParams }: HomePageProps) {
  // Ensure params.lang exists
  const { lang = "en" } = (await params) ?? {};
  const dict = await getDictionary(lang);
  const { page = "1" } = (await searchParams) ?? {};
  const isRtl = lang === "ar";

  // Handle pagination
  const currentPage = Number.parseInt(page);
  const quotesPerPage = 6;

  // Get total quotes count for pagination
  let totalQuotes = 0;
  let databaseInitialized = true;

  try {
    totalQuotes = await countQuotes(lang);
    // If we get 0 quotes, the database might not be initialized
    if (totalQuotes === 0) {
      databaseInitialized = false;
    }
  } catch (error) {
    console.error("Error counting quotes:", error);
    databaseInitialized = false;
  }

  const totalPages = Math.max(1, Math.ceil(totalQuotes / quotesPerPage));

  // Get featured authors (limit to 4)
  const featuredAuthors = databaseInitialized
    ? await getAuthors(lang, 1, 4)
    : [];

  // Get popular tags (limit to 10)
  const popularTags = databaseInitialized ? await getPopularTags(lang, 10) : [];

  // Function to determine tag color based on name
  const getTagColor = (tag: string) => {
    const colors = [
      "bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/40",
      "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-300 dark:hover:bg-green-900/40",
      "bg-purple-100 text-purple-800 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:hover:bg-purple-900/40",
      "bg-amber-100 text-amber-800 hover:bg-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:hover:bg-amber-900/40",
      "bg-pink-100 text-pink-800 hover:bg-pink-200 dark:bg-pink-900/30 dark:text-pink-300 dark:hover:bg-pink-900/40",
      "bg-cyan-100 text-cyan-800 hover:bg-cyan-200 dark:bg-cyan-900/30 dark:text-cyan-300 dark:hover:bg-cyan-900/40",
      "bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300 dark:hover:bg-red-900/40",
      "bg-indigo-100 text-indigo-800 hover:bg-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:hover:bg-indigo-900/40",
    ];

    // Use the sum of character codes to pick a color
    const sum = tag
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[sum % colors.length];
  };

  // Get the title and description for the hero section
  const heroTitle = dict.metadata?.title || "Sayings";
  const heroDescription = dict.home?.description || "Free quote compendium";

  return (
    <>
      {/* Hero Section */}
      <HeroSection
        lang={lang}
        title={heroTitle}
        description={heroDescription}
      />

      <div className="container mx-auto py-6 md:py-8 px-4">
        {!databaseInitialized ? (
          <div className="my-12">
            <DatabaseInitializer />
          </div>
        ) : (
          <>
            <div className="mb-16">
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
                <QuoteProvider
                  lang={lang}
                  currentPage={currentPage}
                  quotesPerPage={quotesPerPage}
                />
              </Suspense>

              <div className="mt-8 md:mt-12">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  lang={lang}
                  dictionary={dict.pagination}
                />
              </div>
            </div>

            {/* Featured Authors Section */}
            {featuredAuthors.length > 0 && (
              <section className="mb-16">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    {dict.home.featuredAuthors || "Featured Authors"}
                  </h2>
                  <Link
                    href={`/${lang}/authors`}
                    className="text-sm text-primary hover:underline flex items-center gap-1"
                  >
                    {dict.authors.allAuthors}
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {featuredAuthors.map((author) => (
                    <Link
                      key={author.username}
                      href={`/${lang}/authors/${author.username}`}
                      className="flex flex-col items-center p-4 bg-card border rounded-lg hover:shadow-md transition-shadow text-center group"
                    >
                      <Avatar className="h-16 w-16 mb-3 rounded-lg">
                        <AvatarImage
                          src={author.avatar || "/placeholder.svg"}
                          alt={author.name}
                          className="object-cover"
                        />
                        <AvatarFallback className="rounded-lg">
                          {author.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <h3 className="font-medium group-hover:text-primary transition-colors">
                        {author.name}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {author.quoteCount}{" "}
                        {author.quoteCount === 1
                          ? dict.authors.quote
                          : dict.authors.quotes}
                      </p>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Popular Tags Section */}
            {popularTags.length > 0 && (
              <section className="mb-16">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    <Tag className="h-5 w-5 text-primary" />
                    {dict.home.popularTags || "Popular Topics"}
                  </h2>
                  <Link
                    href={`/${lang}/tags`}
                    className="text-sm text-primary hover:underline flex items-center gap-1"
                  >
                    {dict.tags.allTags || "All Topics"}
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>

                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tag) => (
                    <Link
                      key={tag.name}
                      href={`/${lang}/tags/${encodeURIComponent(tag.name)}`}
                      className={`${getTagColor(tag.name)} px-3 py-1 rounded-full transition-colors text-sm`}
                    >
                      {tag.name}{" "}
                      <span className="opacity-70">({tag.count})</span>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Call to Action */}
            <section className="bg-primary/5 rounded-xl p-6 md:p-8 text-center mb-8">
              <h2 className="text-xl md:text-2xl font-bold mb-3">
                {dict.home.exploreMore || "Explore More Wisdom"}
              </h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                {dict.home.exploreMoreText ||
                  "Discover more inspirational quotes from our collection of authors and topics."}
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Button asChild>
                  <Link href={`/${lang}/authors`}>
                    <Users className="mr-2 h-4 w-4" />
                    {dict.authors.allAuthors}
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href={`/${lang}/tags`}>
                    <Tag className="mr-2 h-4 w-4" />
                    {dict.tags.allTags || "Browse Topics"}
                  </Link>
                </Button>
              </div>
            </section>
          </>
        )}
      </div>
    </>
  );
}
