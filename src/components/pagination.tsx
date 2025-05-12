import {
  Pagination as PaginationContainer,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { rtlLocales } from "@/middleware";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  lang: string;
  dictionary?: {
    previous?: string;
    next?: string;
    [key: string]: string | undefined;
  };
  baseUrl?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  lang,
  dictionary = {},
  baseUrl,
}: PaginationProps) {
  // Default text for pagination if dictionary is missing or incomplete
  const defaultText = {
    previous: "Previous",
    next: "Next",
  };

  // Use dictionary values if available, otherwise use defaults
  const paginationText = {
    previous: dictionary?.previous || defaultText.previous,
    next: dictionary?.next || defaultText.next,
  };

  // Safely check if lang is defined before using it
  const isRtl = lang && rtlLocales.includes(lang);

  // Use the provided baseUrl or default to the language root
  const urlBase = baseUrl || `/${lang}`;

  // Generate an array of page numbers to display
  const getPageNumbers = () => {
    const pages = [];

    // Always show first page
    pages.push(1);

    // Add current page and surrounding pages
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      if (pages[pages.length - 1] !== i - 1) {
        // Add ellipsis if there's a gap
        pages.push(-1);
      }
      pages.push(i);
    }

    // Add last page if not already included
    if (totalPages > 1) {
      if (pages[pages.length - 1] !== totalPages - 1) {
        // Add ellipsis if there's a gap
        pages.push(-1);
      }
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  // For mobile, show fewer page numbers
  const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
  const visiblePageNumbers = isMobile
    ? pageNumbers.filter(
        (num) =>
          num === 1 || num === totalPages || num === currentPage || num === -1,
      )
    : pageNumbers;

  return (
    <PaginationContainer>
      <PaginationContent className="flex-wrap justify-center">
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious
              href={`${urlBase}?page=${currentPage - 1}`}
              aria-label={paginationText.previous}
              className={isRtl ? "flex-row-reverse" : ""}
              isRtl={isRtl}
            >
              {isRtl ? paginationText.next : paginationText.previous}
            </PaginationPrevious>
          </PaginationItem>
        )}

        {visiblePageNumbers.map((pageNumber, index) =>
          pageNumber === -1 ? (
            <PaginationItem
              key={`ellipsis-${index}`}
              className="hidden sm:inline-block"
            >
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={pageNumber}>
              <PaginationLink
                href={`${urlBase}?page=${pageNumber}`}
                isActive={pageNumber === currentPage}
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          ),
        )}

        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationNext
              href={`${urlBase}?page=${currentPage + 1}`}
              aria-label={paginationText.next}
              className={isRtl ? "flex-row-reverse" : ""}
              isRtl={isRtl}
            >
              {isRtl ? paginationText.previous : paginationText.next}
            </PaginationNext>
          </PaginationItem>
        )}
      </PaginationContent>
    </PaginationContainer>
  );
}
