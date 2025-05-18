"use client";

import { ModalContext } from "@/contexts/modal-context";
import { useContext } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Quote } from "lucide-react";
import Link from "next/link";
import { ShareButtons } from "@/components/share-buttons";
import { Badge } from "@/components/ui/badge";

export function QuoteModal() {
  // Use the context directly to avoid the error if the hook is used outside the provider
  const modalContext = useContext(ModalContext);

  // If no context is available, don't render anything
  if (!modalContext || !modalContext.quote) return null;

  const { isOpen, quote, lang, dictionary, closeModal } = modalContext;

  // Create the URL for sharing
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://quotes-website.com";
  const quoteUrl = `${baseUrl}/${lang}/quotes/${quote.id}`;

  // Handle tag click
  const handleTagClick = () => {
    closeModal();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeModal()}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="sr-only">Quote Details</DialogTitle>
        </DialogHeader>

        <div className="py-4">
          {/* Quote icon */}
          <div className="flex justify-center mb-6">
            <div className="bg-primary/10 p-4 rounded-full">
              <Quote className="h-6 w-6 text-primary" />
            </div>
          </div>

          {/* Quote text */}
          <blockquote className="text-xl md:text-2xl font-serif italic text-center mb-8 leading-relaxed">
            "{quote.text}"
          </blockquote>

          {/* Tags - check if tags exist and have length */}
          {quote.tags && Array.isArray(quote.tags) && quote.tags.length > 0 && (
            <div className="flex flex-wrap justify-center gap-1 mb-6">
              {quote.tags.slice(0, 3).map((tag) => (
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
              onClick={closeModal}
            >
              — {quote.author.name}
            </Link>
          </div>

          {/* Share buttons */}
          <ShareButtons
            quoteText={quote.text}
            authorName={quote.author.name}
            quoteUrl={quoteUrl}
            lang={lang}
            dictionary={dictionary}
          />

          {/* View full page link */}
          <div className="mt-6 text-center">
            <Link
              href={`/${lang}/quotes/${quote.id}`}
              className="text-sm text-primary hover:underline"
              onClick={closeModal}
            >
              {dictionary?.viewFullPage}
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
