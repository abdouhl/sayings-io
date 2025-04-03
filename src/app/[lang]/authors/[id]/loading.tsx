import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { QuoteCardSkeleton } from "@/components/skeletons"

export default function Loading() {
  return (
    <div className="container mx-auto py-8 md:py-16 px-4">
      <div className="flex flex-wrap gap-3 items-center mb-6 md:mb-8">
        <Button variant="outline" size="sm" className="h-9" disabled>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Loading...
        </Button>

        <Button variant="outline" size="sm" className="h-9" disabled>
          Loading...
        </Button>
      </div>

      <div className="max-w-4xl mx-auto mb-12">
        <Skeleton className="rounded-t-lg h-4" />
        <div className="bg-card border border-t-0 rounded-b-lg p-8 shadow-sm">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <Skeleton className="h-32 w-32 rounded-lg" />
            <div className="flex-1 text-center md:text-left">
              <Skeleton className="h-10 w-64 mb-2 mx-auto md:mx-0" />
              <Skeleton className="h-6 w-32 mb-4 mx-auto md:mx-0" />
              <Skeleton className="h-4 w-full max-w-md mx-auto md:mx-0" />
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <Skeleton className="h-8 w-64" />
      </div>

      <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <QuoteCardSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}

