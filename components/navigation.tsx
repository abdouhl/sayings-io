import Link from "next/link"
import { BookOpen } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export function Navigation() {
  return (
    <header className="border-b sticky top-0 bg-background z-10">
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">Sayings</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/discover" className="text-sm font-medium hover:text-primary">
            Discover
          </Link>
          <Link href="/topics" className="text-sm font-medium hover:text-primary">
            Topics
          </Link>
          <Link href="/authors" className="text-sm font-medium hover:text-primary">
            Authors
          </Link>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  )
}

