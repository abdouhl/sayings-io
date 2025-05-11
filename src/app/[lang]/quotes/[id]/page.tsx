import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft, Quote, TagIcon } from "lucide-react";
import { getDictionary } from "@/dictionaries";
import {
  getQuoteById,
  getRelatedQuotes,
  generateStaticParams as generateQuoteParams,
} from "@/lib/quotes";
import { notFound } from "next/navigation";
import { ShareButtons } from "@/components/share-buttons";
import type { Metadata, ResolvingMetadata } from "next";

import { QuoteStructuredData } from "@/components/structured-data";
import { Badge } from "@/components/ui/badge";
import { QuoteCard } from "@/components/quote-card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

type QuotePageProps = {
  params: Promise<{ lang: string; id: string }>;
};

export const revalidate = 2592000;

export async function generateStaticParams() {
  return generateQuoteParams();
}

export async function generateMetadata(
  { params }: QuotePageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // Ensure params.lang exists
  const { lang = "en" } = (await params) ?? {};
  const dict = await getDictionary(lang);
  const { id } = await params;
  const quote = await getQuoteById(id, lang);

  if (!quote) {
    return {
      title: dict.quotes.notFound,
    };
  }

  // Create the URL for sharing
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://quotes-website.com";
  const quoteUrl = `${baseUrl}/${lang}/quotes/${quote.id}`;
  const twitterImageUrl = `${quoteUrl}/twitter-image`;
  const ogImageUrl = `${quoteUrl}/opengraph-image`;

  // Create a truncated version of the quote for meta titles
  const shortQuote =
    quote.text.length > 60 ? `${quote.text.substring(0, 57)}...` : quote.text;

  return {
    title: `"${shortQuote}" — ${quote.author.name}`,
    description: `${quote.text} — Quote by ${quote.author.name}`,
    openGraph: {
      title: `"${shortQuote}" — ${quote.author.name}`,
      description: quote.text,
      type: "article",
      authors: [quote.author.name],
      tags: quote.tags || [],
      images: [
        {
          url: ogImageUrl,
          width: 1000,
          height: 1500,
          alt: `Quote by ${quote.author.name}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `"${shortQuote}" — ${quote.author.name}`,
      description: quote.text,
      images: [twitterImageUrl],
    },
    other: {
      // Twitter specific meta tags
      "twitter:image": twitterImageUrl,
      "twitter:description": `"${quote.text}" — ${quote.author.name}`,
      "twitter:url": quoteUrl,
      // Pinterest specific meta tags
      "pinterest:image": ogImageUrl,
      "pinterest:description": `"${quote.text}" — ${quote.author.name}`,
      "pinterest:url": quoteUrl,
      "pinterest:media": ogImageUrl,
    },
    alternates: {
      canonical: quoteUrl,
      languages: {
        en: `${baseUrl}/en/quotes/${quote.id}`,
        es: `${baseUrl}/es/quotes/${quote.id}`,
        ar: `${baseUrl}/ar/quotes/${quote.id}`,
        fr: `${baseUrl}/fr/quotes/${quote.id}`,
      },
    },
    keywords: [
      "quote",
      "saying",
      quote.author.name,
      ...(quote.tags || []),
      "inspirational quote",
      "wisdom",
    ],
  };
}

export default async function QuotePage({ params }: QuotePageProps) {
  // Ensure params.lang exists
  const { lang = "en" } = (await params) ?? {};
  const dict = await getDictionary(lang);
  const { id } = await params;
  const quote = await getQuoteById(id, lang);

  if (!quote) {
    notFound();
  }

  // Create the URL for sharing
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://yourdomain.com";
  const quoteUrl = `${baseUrl}/${lang}/quotes/${quote.id}`;

  // Get related quotes based on author and tags
  const relatedQuotes = await getRelatedQuotes(
    quote.id,
    quote.author.username,
    quote.tags || [],
    lang,
    3,
  );

  return (
    <>
      {/* Add structured data */}
      <QuoteStructuredData quote={quote} lang={lang} baseUrl={baseUrl} />

      <div className="container mx-auto py-8 md:py-16 px-4">
        {/* Breadcrumbs for better navigation and SEO */}
        <Breadcrumb className="mb-4">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href={`/${lang}`}>
                {dict.navigation.home}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink
                href={`/${lang}/authors/${quote.author.username}`}
              >
                {quote.author.name}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Quote</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <Link href={`/${lang}`}>
          <Button variant="outline" className="mb-6 md:mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {dict.navigation.backToHome}
          </Button>
        </Link>

        <div className="max-w-3xl mx-auto">
          <div className="bg-card rounded-lg border shadow-sm overflow-hidden">
            {/* Decorative top bar */}
            <div className="h-2 bg-gradient-to-r from-primary/80 to-primary"></div>

            <div className="p-6 md:p-10">
              {/* Quote icon */}
              <div className="flex justify-center mb-6">
                <div className="bg-primary/10 p-4 rounded-full">
                  <Quote className="h-8 w-8 text-primary" />
                </div>
              </div>

              {/* Quote text */}
              <blockquote className="text-xl md:text-2xl lg:text-3xl font-serif italic text-center mb-8 leading-relaxed">
                "{quote.text}"
              </blockquote>

              {/* Tags - check if tags exist and have length */}
              {quote.tags &&
                Array.isArray(quote.tags) &&
                quote.tags.length > 0 && (
                  <div className="flex flex-wrap justify-center gap-2 mb-8">
                    {quote.tags.map((tag) => (
                      <Link
                        key={tag}
                        href={`/${lang}/tags/${encodeURIComponent(tag)}`}
                      >
                        <Badge
                          variant="secondary"
                          className="hover:bg-secondary/80 cursor-pointer"
                        >
                          {tag}
                        </Badge>
                      </Link>
                    ))}
                  </div>
                )}

              {/* Author info */}
              <div className="flex flex-col items-center gap-4 mb-8">
                <Avatar className="h-16 w-16 rounded-lg">
                  <AvatarImage
                    src={quote.author.avatar || "/placeholder.svg"}
                    alt={quote.author.name}
                    className="object-cover"
                  />
                  <AvatarFallback className="rounded-lg text-lg">
                    {quote.author.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <Link
                  href={`/${lang}/authors/${quote.author.username}`}
                  className="text-lg md:text-xl font-medium hover:underline"
                >
                  — {quote.author.name}
                </Link>
              </div>

              {/* Share and copy buttons */}
              <ShareButtons
                quoteText={quote.text}
                authorName={quote.author.name}
                quoteUrl={quoteUrl}
                lang={lang}
                dictionary={dict.quotes}
              />
            </div>
          </div>

          {/* Related quotes section */}
          {relatedQuotes.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Quote className="h-5 w-5 text-primary" />
                {dict.quotes.relatedQuotes || "Related Quotes"}
              </h2>

              <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {relatedQuotes.map((relatedQuote) => (
                  <QuoteCard
                    key={relatedQuote.id}
                    quote={relatedQuote}
                    lang={lang}
                    dictionary={dict.quotes}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Topic exploration section */}
          {quote.tags && quote.tags.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <TagIcon className="h-5 w-5 text-primary" />
                {dict.tags.exploreTags || "Explore Topics"}
              </h2>

              <div className="flex flex-wrap gap-3 justify-center">
                {quote.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/${lang}/tags/${encodeURIComponent(tag)}`}
                    className="bg-primary/10 hover:bg-primary/20 text-primary px-4 py-2 rounded-full transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
