
import type { Metadata } from "next"
import HomePageClient from "./home-page-client"

export const metadata: Metadata = {
  title: "Sayings - Discover Wisdom in Words",
  description:
    "Explore inspiring sayings from great minds throughout history. Find motivation, wisdom, and insight in our curated collection of quotes.",
  keywords: "quotes, sayings, wisdom, inspiration, motivation",
  openGraph: {
    title: "Sayings - Discover Wisdom in Words",
    description: "Explore inspiring sayings from great minds throughout history.",
    url: "https://sayings.com",
    siteName: "Sayings",
    images: [
      {
        url: "https://sayings.com/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en-US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sayings - Discover Wisdom in Words",
    description: "Explore inspiring sayings from great minds throughout history.",
    images: ["https://sayings.com/twitter-image.jpg"],
  },
}

export default function HomePage() {
  return <HomePageClient />
}

