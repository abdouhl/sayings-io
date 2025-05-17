"use client";

import type React from "react";
import Link from "next/link";
import type { Quote } from "@/types/quote";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { rtlLocales } from "@/middleware";
import { QuoteIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useContext } from "react";
import { ModalContext } from "@/contexts/modal-context";

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
  // Safely try to access the modal context
  const modalContext = useContext(ModalContext);

  // Safely check if lang is defined before using it
  const isRtl = rtlLocales.includes(lang);

  // Handle quote click to open modal
  const handleQuoteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // Only use the modal if the context is available
    if (modalContext?.openModal) {
      modalContext.openModal(quote, lang, dictionary);
    } else {
      // If modal context is not available, navigate to the quote page
      window.location.href = `/${lang}/quotes/${quote.id}`;
    }
  };

  // Prevent tag clicks from opening the quote modal
  const handleTagClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <Card className="!py-0 h-full flex flex-col overflow-hidden hover:shadow-md transition-shadow duration-300 border-2 hover:border-primary/30">
      <CardContent className={` ${hideAuthor ? "py-6" : "pt-6"}  flex-1 relative`}>
        <div
          className={`absolute top-2 ${isRtl ? "right-2" : "left-2"} text-primary/20`}
        >
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
              <Link
                key={tag}
                href={`/${lang}/tags/${encodeURIComponent(tag)}`}
                onClick={handleTagClick}
              >
                <Badge
                  variant="secondary"
                  className="text-xs hover:bg-secondary/80 cursor-pointer"
                >
                  {tag}
                </Badge>
              </Link>
            ))}
          </div>
        )}
      </CardContent>
      {!hideAuthor && (
        <CardFooter className="border-t py-4 flex items-center gap-3 bg-muted/30">
          <Avatar className="h-8 w-8 rounded-md">
            <AvatarImage
              src={quote.author.avatar || "/placeholder.svg"}
              alt={quote.author.name}
              className="object-cover"
            />
            <AvatarFallback className="rounded-md">
              {quote.author.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <Link
            href={`/${lang}/authors/${quote.author.username}`}
            className="text-sm font-medium hover:text-primary transition-colors ml-auto"
            title={`${dictionary.quoteBy} ${quote.author.name}`}
          >
            — {quote.author.name}
          </Link>
        </CardFooter>
      )}
    </Card>
  );
}
