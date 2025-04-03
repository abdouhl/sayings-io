import { AuthorCardSkeleton } from "@/components/skeletons"

export default function Loading() {
  return (
    <div className="container mx-auto py-8 md:py-16 px-4">
      <div className="h-8 w-64 bg-muted rounded-md mx-auto mb-6 md:mb-8"></div>
      <div className="h-4 w-96 bg-muted rounded-md mx-auto mb-8"></div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <AuthorCardSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}

