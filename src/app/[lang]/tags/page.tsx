import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Tag } from "lucide-react";
import { getDictionary } from "@/dictionaries";
import { getAllTags } from "@/lib/tags";
import type { Metadata, ResolvingMetadata } from "next";

type TagsPageProps = {
  params: Promise<{ lang: string }>;
};

export const revalidate = 2592000;

export async function generateMetadata({
  params,
}: TagsPageProps): Promise<Metadata> {
  const { lang = "en" } = (await params) ?? {} 
  const dict = await getDictionary(lang);

  return {
    title: dict.tags.allTags,
    description: dict.tags.description,
    openGraph: {
      title: dict.tags.allTags,
      description: dict.tags.description,
      type: "website",
    },
  };
}

export default async function TagsPage({ params }: TagsPageProps) {
  const { lang = "en" } = (await params) ?? {};
  const dict = await getDictionary(lang);
  const isRtl = lang === "ar";

  const tags = await getAllTags(lang);

  // Function to determine tag size based on count
  const getTagSize = (count: number) => {
    if (count >= 10) return "text-xl font-bold";
    if (count >= 5) return "text-lg font-semibold";
    if (count >= 3) return "text-base font-medium";
    return "text-sm";
  };

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

  return (
    <div className="container mx-auto py-8 md:py-16 px-4">
      <div className="flex flex-wrap gap-3 items-center mb-6 md:mb-8">
        <Link href={`/${lang}`}>
          <Button variant="outline" size="sm" className="h-9">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {dict.navigation.backToHome}
          </Button>
        </Link>
      </div>

      <div className="max-w-4xl mx-auto text-center mb-12">
        <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-4">
          <Tag className="h-6 w-6 text-primary" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          {dict.tags.allTags}
        </h1>
        <p className="text-muted-foreground mb-8">{dict.tags.description}</p>
      </div>

      {tags.length === 0 ? (
        <div className="bg-card border rounded-lg p-12 text-center">
          <p className="text-muted-foreground">{dict.tags.noTags}</p>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            {tags.map((tag) => (
              <Link
                key={tag.name}
                href={`/${lang}/tags/${encodeURIComponent(tag.name)}`}
                className={`${getTagColor(tag.name)} ${getTagSize(tag.count)} px-3 py-1 rounded-full transition-colors`}
              >
                {tag.name} <span className="opacity-70">({tag.count})</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
