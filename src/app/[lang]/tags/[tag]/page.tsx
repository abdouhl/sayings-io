import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Tag } from "lucide-react";
import { getDictionary } from "@/dictionaries";
import { getQuotesByTag, countQuotesByTag } from "@/lib/tags";
import type { Metadata } from "next";
import { QuoteCard } from "@/components/quote-card";
import { Pagination } from "@/components/pagination";

type TagPageProps = {
  params: Promise<{ lang: string; tag: string }>;
  searchParams: Promise<{ page: string }>;
};
export const revalidate = 2592000;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; tag: string }>;
}): Promise<Metadata> {
  const { lang = "en" } = (await params) ?? {};
  const dict = await getDictionary(lang);
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);

  return {
    title: `${dict.tags.quotesWithTag} "${decodedTag}"`,
    description: `${dict.tags.exploreQuotesWithTag} "${decodedTag}"`,
    openGraph: {
      title: `${dict.tags.quotesWithTag} "${decodedTag}"`,
      description: `${dict.tags.exploreQuotesWithTag} "${decodedTag}"`,
      type: "website",
    },
  };
}

export default async function TagPage({ params, searchParams }: TagPageProps) {
   const { lang = "en" } = (await params) ?? {};
  const dict = await getDictionary(lang);
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const { page = "1" } = (await searchParams) ?? {};

  // Handle pagination
  const currentPage = Number.parseInt(page);
  const quotesPerPage = 9;

  const quotes = await getQuotesByTag(
    decodedTag,
    lang,
    currentPage,
    quotesPerPage,
  );

  const totalQuotes = await countQuotesByTag(decodedTag, lang);
  const totalPages = Math.max(1, Math.ceil(totalQuotes / quotesPerPage));

  return (
    <div className="container mx-auto py-8 md:py-16 px-4">
      <div className="flex flex-wrap gap-3 items-center mb-6 md:mb-8">
        <Link href={`/${lang}`}>
          <Button variant="outline" size="sm" className="h-9">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {dict.navigation.backToHome}
          </Button>
        </Link>

        <Link href={`/${lang}/tags`}>
          <Button variant="outline" size="sm" className="h-9">
            {dict.tags.allTags}
          </Button>
        </Link>
      </div>

      <div className="max-w-4xl mx-auto text-center mb-12">
        <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-4">
          <Tag className="h-6 w-6 text-primary" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          {dict.tags.quotesWithTag} "{decodedTag}"
        </h1>
        <p className="text-muted-foreground">
          {totalQuotes}{" "}
          {totalQuotes === 1 ? dict.authors.quote : dict.authors.quotes}
        </p>
      </div>

      {quotes.length === 0 ? (
        <div className="bg-card border rounded-lg p-12 text-center">
          <p className="text-muted-foreground">{dict.tags.noQuotes}</p>
        </div>
      ) : (
        <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {quotes.map((quote) => (
            <QuoteCard
              key={quote.id}
              quote={quote}
              lang={lang}
              dictionary={dict.quotes}
            />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-12">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            lang={lang}
            dictionary={dict.pagination}
            baseUrl={`/${lang}/tags/${tag}`}
          />
        </div>
      )}
    </div>
  );
}
