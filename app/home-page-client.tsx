"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, BookOpen, TrendingUp, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Layout } from "@/components/layout"
import dynamic from "next/dynamic"

const QuoteCard = dynamic(() => import("@/components/quote-card"), {
  loading: () => <p>Loading...</p>,
})

// Placeholder data for quotes
const initialQuotes = [
  {
    id: "1",
    quote: "Life is what happens when you're busy making other plans.",
    authorName: "John Lennon",
    authorSlug: "john-lennon",
    authorImage: "/placeholder.svg?height=40&width=40",
    authorInitials: "JL",
    tags: ["life", "planning", "wisdom"],
  },
  {
    id: "2",
    quote: "The way to get started is to quit talking and begin doing.",
    authorName: "Walt Disney",
    authorSlug: "walt-disney",
    authorImage: "/placeholder.svg?height=40&width=40",
    authorInitials: "WD",
    tags: ["motivation", "action", "success"],
  },
  {
    id: "3",
    quote: "Your time is limited, so don't waste it living someone else's life.",
    authorName: "Steve Jobs",
    authorSlug: "steve-jobs",
    authorImage: "/placeholder.svg?height=40&width=40",
    authorInitials: "SJ",
    tags: ["time", "authenticity", "life"],
  },
  // ... add more initial quotes here
]

export default function HomePageClient() {
  const [quotes, setQuotes] = useState(initialQuotes)
  const [loading, setLoading] = useState(false)

  const loadMoreQuotes = async () => {
    setLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Add more quotes (in a real app, you'd fetch these from an API)
    const newQuotes = [
      {
        id: String(quotes.length + 1),
        quote: "The only way to do great work is to love what you do.",
        authorName: "Steve Jobs",
        authorSlug: "steve-jobs",
        authorImage: "/placeholder.svg?height=40&width=40",
        authorInitials: "SJ",
        tags: ["work", "passion", "success"],
      },
      {
        id: String(quotes.length + 2),
        quote: "In the end, it's not the years in your life that count. It's the life in your years.",
        authorName: "Abraham Lincoln",
        authorSlug: "abraham-lincoln",
        authorImage: "/placeholder.svg?height=40&width=40",
        authorInitials: "AL",
        tags: ["life", "wisdom", "inspiration"],
      },
      // ... add more new quotes here
    ]

    setQuotes([...quotes, ...newQuotes])
    setLoading(false)
  }

  return (
    <Layout>
      <main className="flex-1">
        <section className="py-12 md:py-24 bg-primary/10">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 mb-12">
              <h1 className="text-3xl md:text-5xl font-bold tracking-tighter">Discover Wisdom in Words</h1>
              <p className="text-muted-foreground md:text-xl max-w-[700px]">
                Explore inspiring sayings from great minds throughout history
              </p>
              <div className="w-full max-w-md flex items-center space-x-2">
                <Input type="text" placeholder="Search sayings, authors, or topics..." className="flex-1" />
                <Button type="submit">
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>
            </div>

            <div className="relative mx-auto max-w-3xl p-6 md:p-10 bg-card rounded-xl shadow-lg border">
              <div className="absolute -top-3 -left-3">
                <BookOpen className="h-10 w-10 text-primary" />
              </div>
              <blockquote className="text-xl md:text-2xl italic text-center">
                "The future belongs to those who believe in the beauty of their dreams."
              </blockquote>
              <div className="mt-6 text-center">
                <p className="font-semibold">Eleanor Roosevelt</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 container px-4 md:px-6">
          <Tabs defaultValue="trending" className="w-full">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Explore Sayings</h2>
              <TabsList>
                <TabsTrigger value="trending" className="flex items-center gap-1">
                  <TrendingUp className="h-4 w-4" />
                  Trending
                </TabsTrigger>
                <TabsTrigger value="recent" className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  Recent
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="trending" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {quotes.map((quote) => (
                  <QuoteCard key={quote.id} {...quote} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="recent" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {quotes.map((quote) => (
                  <QuoteCard key={quote.id} {...quote} />
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-10 text-center">
            <Button size="lg" onClick={loadMoreQuotes} disabled={loading}>
              {loading ? "Loading..." : "Load More Sayings"}
            </Button>
          </div>
        </section>

        <section className="py-12 bg-primary/5">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-center mb-8">Browse by Categories</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                "Motivation",
                "Success",
                "Wisdom",
                "Happiness",
                "Love",
                "Life",
                "Friendship",
                "Leadership",
                "Change",
                "Education",
                "Faith",
                "Family",
              ].map((category) => (
                <Link
                  key={category}
                  href={`/topic/${category.toLowerCase()}`}
                  className="bg-card hover:bg-primary/10 rounded-lg p-4 text-center transition-colors border"
                >
                  <span className="font-medium">{category}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Sayings",
            url: "https://sayings.com",
            description: "Explore inspiring sayings from great minds throughout history.",
            potentialAction: {
              "@type": "SearchAction",
              target: {
                "@type": "EntryPoint",
                urlTemplate: "https://sayings.com/search?q={search_term_string}",
              },
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />
    </Layout>
  )
}

