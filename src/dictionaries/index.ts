import "server-only"

export type Dictionary = {
  metadata: {
    title: string
    description: string
  }
  navigation: {
    home: string
    authors: string
    allAuthors: string
    backToHome: string
    [key: string]: string
  }
  home: {
    title: string
    description: string
  }
  quotes: {
    quoteBy: string
    notFound: string
    [key: string]: string
  }
  authors: {
    allAuthors: string
    quotesBy: string
    exploreQuotesBy: string
    viewQuotes: string
    quote: string
    quotes: string
    noQuotes: string
    notFound: string
    description: string
    [key: string]: string
  }
  pagination: {
    previous: string
    next: string
    [key: string]: string
  }
  footer: {
    copyright: string
    [key: string]: string
  }
  notFound?: {
    title: string
    message: string
  }
  about: any
  contact: any
  privacy: any
  terms: any
}

// Default fallback dictionary (English)
const fallbackDictionary: Dictionary = {
  metadata: {
    title: "QuotesHub - Inspirational Quotes",
    description: "Discover a collection of inspirational quotes from famous authors and personalities.",
  },
  navigation: {
    home: "Home",
    authors: "Authors",
    allAuthors: "All Authors",
    backToHome: "Back to Home",
  },
  home: {
    title: "Inspirational Quotes",
    description: "Discover wisdom from the world's greatest minds.",
  },
  quotes: {
    quoteBy: "Quote by",
    notFound: "Quote not found",
  },
  authors: {
    allAuthors: "All Authors",
    quotesBy: "Quotes by",
    exploreQuotesBy: "Explore inspirational quotes by",
    viewQuotes: "View Quotes",
    quote: "quote",
    quotes: "quotes",
    noQuotes: "No quotes found for this author.",
    notFound: "Author not found",
    description: "Browse quotes from famous authors and personalities.",
  },
  pagination: {
    previous: "Previous",
    next: "Next",
  },
  footer: {
    copyright: "QuotesHub. All rights reserved.",
  },
  notFound: {
    title: "Page Not Found",
    message: "The page you are looking for doesn't exist or has been moved.",
  },
  about: "Page Not Found",
  contact: "Page Not Found",
  privacy: "Page Not Found",
  terms: "Page Not Found"
}

const dictionaries = {
  en: () => import("./en.json").then((module) => module.default) as Promise<Dictionary>,
  es: () => import("./es.json").then((module) => module.default) as Promise<Dictionary>,
  ar: () => import("./ar.json").then((module) => module.default) as Promise<Dictionary>,
  fr: () => import("./fr.json").then((module) => module.default) as Promise<Dictionary>

}

export const getDictionary = async (locale: string): Promise<Dictionary> => {
  try {
    // Try to get the requested dictionary
    const dictionary = await (dictionaries[locale as keyof typeof dictionaries] || dictionaries.en)()
    return dictionary
  } catch (error) {
    console.error(`Error loading dictionary for locale ${locale}:`, error)
    // Return fallback dictionary if there's an error
    return fallbackDictionary
  }
}

