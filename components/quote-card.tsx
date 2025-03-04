import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { QuoteIcon } from "lucide-react"

interface QuoteCardProps {
  quote: string
  authorName: string
  authorImage?: string
  authorInitials?: string
  tags?: string[]
}

export default function QuoteCard({
  quote = "The greatest glory in living lies not in never falling, but in rising every time we fall.",
  authorName = "Nelson Mandela",
  authorImage = "/placeholder.svg?height=40&width=40",
  authorInitials = "NM",
  tags = ["inspiration", "perseverance", "life"],
}: QuoteCardProps) {
  return (
    <Card className="max-w-md mx-auto overflow-hidden">
      <CardContent className="pt-6 pb-2">
        <div className="flex gap-2">
          <QuoteIcon className="h-6 w-6 text-primary shrink-0 mt-1" />
          <p className="text-lg italic leading-relaxed">{quote}</p>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-4 pt-2 pb-6">
        <div className="flex items-center gap-3 mt-2">
          <Avatar className="h-10 w-10 border-2 border-primary/10">
            <AvatarImage src={authorImage} alt={authorName} />
            <AvatarFallback>{authorInitials}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{authorName}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardFooter>
    </Card>
  )
}

