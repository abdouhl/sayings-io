import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { getDictionary } from "@/dictionaries";
import type { Metadata, ResolvingMetadata } from "next";
import { getAuthors, countAuthors } from "@/lib/authors";

import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { Pagination } from "@/components/pagination";

type AuthorsPageProps = {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ page: string }>;
};

export const revalidate = 2592000;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  // Ensure params.lang exists
  const { lang = "en" } = (await params) ?? {};
  const dict = await getDictionary(lang);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://yourdomain.com";

  return {
    title: dict.authors.allAuthors,
    description: dict.authors.description,
    alternates: {
      canonical: `${baseUrl}/${lang}/authors`,
      languages: {
        en: `${baseUrl}/en/authors`,
        es: `${baseUrl}/es/authors`,
        ar: `${baseUrl}/ar/authors`,
        fr: `${baseUrl}/fr/authors`,
      },
    },
    openGraph: {
      title: dict.authors.allAuthors,
      description: dict.authors.description,
      type: "website",
      locale: lang,
      url: `${baseUrl}/${lang}/authors`,
      siteName: "Sayings - Inspirational Quotes",
    },
    keywords: [
      "authors",
      "quotes",
      "inspirational quotes",
      "famous authors",
      "wisdom",
    ],
  };
}

export default async function AuthorsPage({
  params,
  searchParams,
}: AuthorsPageProps) {
  // Ensure params.lang exists
  const { lang = "en" } = (await params) ?? {};
  const dict = await getDictionary(lang);
  const { page = "1" } = (await searchParams) ?? {};

  const isRtl = lang === "ar";
  // Handle pagination
  const currentPage = Number.parseInt(page);
  const authorsPerPage = 12;

  const authors = await getAuthors(lang, currentPage, authorsPerPage);
  const totalAuthors = await countAuthors(lang);
  const totalPages = Math.max(1, Math.ceil(totalAuthors / authorsPerPage));

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
    ];

    // Use the sum of character codes to pick a color
    const sum = name
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[sum % colors.length];
  };

  return (
    <div className="container mx-auto py-8 md:py-16 px-4">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          {dict.authors.allAuthors}
        </h1>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
          {dict.authors.description}
        </p>
      </div>

      {authors.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            {dict.authors.noAuthors || "No authors found"}
          </p>
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {authors.map((author) => (
            <Link
              href={`/${lang}/authors/${author.username}`}
              key={author.username}
              className="group transition-transform duration-300 hover:-translate-y-1"
            >
              <Card className="h-full flex flex-col overflow-hidden border-2 hover:border-primary/50 transition-colors !pt-0">
                <div
                  className={`h-3 bg-gradient-to-r ${getGradientColor(author.name)}`}
                ></div>
                <CardContent className="pt-6 flex-1 flex flex-col items-center text-center">
                  <div className="relative mb-4">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${getGradientColor(author.name)} rounded-lg opacity-20 group-hover:opacity-30 transition-opacity`}
                    ></div>
                    <Avatar className="h-24 w-24 rounded-lg border-2 border-background shadow-md">
                      <AvatarImage
                        src={author.avatar || "/placeholder.svg"}
                        alt={author.name}
                        className="object-cover"
                      />
                      <AvatarFallback className="text-2xl rounded-lg">
                        {author.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <h2 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {author.name}
                  </h2>
                  <Badge variant="secondary" className="mb-2">
                    {author.quoteCount}{" "}
                    {author.quoteCount === 1
                      ? dict.authors.quote
                      : dict.authors.quotes}
                  </Badge>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {dict.authors.exploreQuotesBy} {author.name}
                  </p>
                </CardContent>
                <CardFooter className="border-t py-4 justify-center">
                  <span
                    className={`text-sm font-medium text-primary flex items-center gap-1 group-hover:gap-2 transition-all ${isRtl ? "flex-row-reverse" : ""}`}
                  >
                    {dict.authors.viewQuotes}
                    <ArrowRight className="h-3 w-3" />
                  </span>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      )}

      <div className="mt-12">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          lang={lang}
          dictionary={dict.pagination}
        />
      </div>
    </div>
  );
}
