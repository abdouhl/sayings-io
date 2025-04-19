"use client";

import type React from "react";
import Link from "next/link";
import type { Quote } from "@/types/quote";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { rtlLocales } from "@/middleware";
import { useModal } from "@/contexts/modal-context";
import { QuoteIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface QuoteCardProps {
  quote: Quote;
  lang?: string;
  dictionary?: {
    quoteBy: string;
    [key: string]: string;
  };
  hideAuthor?: boolean;
}

export function QuoteCard({
  quote,
  lang = "en",
  dictionary = { quoteBy: "Quote by" },
  hideAuthor = false,
}: QuoteCardProps) {
  const { openModal } = useModal();

  // Safely check if lang is defined before using it
  const isRtl = rtlLocales.includes(lang);

  // Handle quote click to open modal
  const handleQuoteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    openModal(quote, lang, dictionary);
  };

  return (
    <Card className="h-full flex flex-col overflow-hidden hover:shadow-md transition-shadow duration-300 border-2 hover:border-primary/30">
      <CardContent className="pt-6 flex-1 relative">
        <div className="absolute top-2 left-2 text-primary/20">
          <QuoteIcon className="h-8 w-8" />
        </div>
        <a
          href={`/${lang}/quotes/${quote.id}`}
          className="block group cursor-pointer"
          onClick={handleQuoteClick}
        >
          <blockquote
            className={`text-base md:text-lg font-serif italic group-hover:text-primary transition-colors ${isRtl ? "text-right" : ""}`}
          >
            "{quote.text}"
          </blockquote>
        </a>

        {/* Tags - check if tags exist and have length */}
        {quote.tags && Array.isArray(quote.tags) && quote.tags.length > 0 && (
          <div
            className={`flex flex-wrap gap-1 mt-4 ${isRtl ? "justify-end" : ""}`}
          >
            {quote.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      {!hideAuthor && (
        <CardFooter className="border-t pt-4 flex items-center gap-3 bg-muted/30">
          <Avatar className="h-8 w-8 rounded-md">
            <AvatarImage
              src={quote.author.avatar}
              alt={quote.author.name}
              className="object-cover"
            />
            <AvatarFallback className="rounded-md">
              {quote.author.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <Link
            href={`/${lang}/authors/${quote.author.username}`}
            className={`text-sm font-medium hover:text-primary transition-colors ml-auto`}
            title={`${dictionary.quoteBy} ${quote.author.name}`}
          >
            — {quote.author.name}
          </Link>
        </CardFooter>
      )}
    </Card>
  );
}
