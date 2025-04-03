import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { QuoteDetailSkeleton } from "@/components/skeletons"

export default function Loading() {
  return (
    <div className="container mx-auto py-8 md:py-16 px-4">
      <Button variant="outline" className="mb-6 md:mb-8" disabled>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Loading...
      </Button>

      <QuoteDetailSkeleton />
    </div>
  )
}

