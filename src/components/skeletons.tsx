import { Skeleton } from "@/components/ui/skeleton"

export function QuoteCardSkeleton() {
  return (
    <div className="h-full flex flex-col border rounded-lg shadow-sm bg-card overflow-hidden">
      <div className="p-6 flex-1">
        <Skeleton className="h-4 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-5/6 mb-2" />
        <Skeleton className="h-4 w-4/5" />
      </div>
      <div className="border-t p-4 flex items-center gap-3">
        <Skeleton className="h-8 w-8 rounded-md" />
        <Skeleton className="h-4 w-24 ml-auto" />
      </div>
    </div>
  )
}

export function AuthorCardSkeleton() {
  return (
    <div className="h-full flex flex-col border rounded-lg shadow-sm bg-card overflow-hidden">
      <div className="p-6 flex-1 flex flex-col items-center text-center">
        <Skeleton className="h-20 w-20 rounded-lg mb-4" />
        <Skeleton className="h-6 w-32 mb-2" />
        <Skeleton className="h-4 w-16" />
      </div>
      <div className="border-t p-4 flex justify-center">
        <Skeleton className="h-4 w-24" />
      </div>
    </div>
  )
}

export function QuoteDetailSkeleton() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-card rounded-lg border shadow-sm overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-primary/80 to-primary"></div>
        <div className="p-6 md:p-10">
          <div className="flex justify-center mb-6">
            <Skeleton className="h-16 w-16 rounded-full" />
          </div>
          <div className="space-y-4 mb-8">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-5/6 mx-auto" />
            <Skeleton className="h-6 w-4/5 mx-auto" />
          </div>
          <div className="flex flex-col items-center gap-4 mb-8">
            <Skeleton className="h-16 w-16 rounded-lg" />
            <Skeleton className="h-6 w-32" />
          </div>
          <div className="flex justify-center gap-2">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  )
}

