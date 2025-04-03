import { QuoteCardSkeleton } from "@/components/skeletons"

export default function Loading() {
  return (
    <div className="container mx-auto py-6 md:py-8 px-4">
      <div className="h-8 w-64 bg-muted rounded-md mx-auto mb-6 md:mb-8"></div>
      <div className="h-4 w-96 bg-muted rounded-md mx-auto mb-8"></div>

      <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <QuoteCardSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}

