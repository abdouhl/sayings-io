import {
  Pagination as PaginationContainer,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { rtlLocales } from "@/middleware"

interface PaginationProps {
  currentPage: number
  totalPages: number
  lang: string
  dictionary: {
    previous: string
    next: string
    [key: string]: string
  }
}

export function Pagination({ currentPage, totalPages, lang, dictionary }: PaginationProps) {
  // Safely check if lang is defined before using it
  const isRtl = lang && rtlLocales.includes(lang)

  // Generate an array of page numbers to display
  const getPageNumbers = () => {
    const pages = []

    // Always show first page
    pages.push(1)

    // Add current page and surrounding pages
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      if (pages[pages.length - 1] !== i - 1) {
        // Add ellipsis if there's a gap
        pages.push(-1)
      }
      pages.push(i)
    }

    // Add last page if not already included
    if (totalPages > 1) {
      if (pages[pages.length - 1] !== totalPages - 1) {
        // Add ellipsis if there's a gap
        pages.push(-1)
      }
      pages.push(totalPages)
    }

    return pages
  }

  const pageNumbers = getPageNumbers()

  // For mobile, show fewer page numbers
  const isMobile = typeof window !== "undefined" && window.innerWidth < 640
  const visiblePageNumbers = isMobile
    ? pageNumbers.filter((num) => num === 1 || num === totalPages || num === currentPage || num === -1)
    : pageNumbers

  return (
    <PaginationContainer>
      <PaginationContent className="flex-wrap justify-center">
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious
              href={`/${lang}?page=${currentPage - 1}`}
              aria-label={dictionary.previous}
              className={isRtl ? "flex-row-reverse" : ""}
            >
              {isRtl ? dictionary.next : dictionary.previous}
            </PaginationPrevious>
          </PaginationItem>
        )}

        {visiblePageNumbers.map((pageNumber, index) =>
          pageNumber === -1 ? (
            <PaginationItem key={`ellipsis-${index}`} className="hidden sm:inline-block">
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={pageNumber}>
              <PaginationLink href={`/${lang}?page=${pageNumber}`} isActive={pageNumber === currentPage}>
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          ),
        )}

        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationNext
              href={`/${lang}?page=${currentPage + 1}`}
              aria-label={dictionary.next}
              className={isRtl ? "flex-row-reverse" : ""}
            >
              {isRtl ? dictionary.previous : dictionary.next}
            </PaginationNext>
          </PaginationItem>
        )}
      </PaginationContent>
    </PaginationContainer>
  )
}

