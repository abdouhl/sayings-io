import type { Locale } from "../middleware.ts";

// Import dictionaries
import en from "./en.json";
import es from "./es.json";
import ar from "./ar.json";
import fr from "./fr.json";
import pt from "./pt.json";

export type Dictionary = {
  metadata: {
    title: string;
    description: string;
    [key: string]: string;
  };
  navigation: {
    home: string;
    authors: string;
    allAuthors: string;
    backToHome: string;
    [key: string]: string;
  };
  home: {
    title: string;
    description: string;
    [key: string]: string;
  };
  quotes: {
    quoteBy: string;
    notFound: string;
    [key: string]: string;
  };
  authors: {
    allAuthors: string;
    quotesBy: string;
    exploreQuotesBy: string;
    viewQuotes: string;
    quote: string;
    quotes: string;
    noQuotes: string;
    notFound: string;
    description: string;
    [key: string]: string;
  };
  pagination: {
    previous: string;
    next: string;
    [key: string]: string;
  };
  footer: {
    copyright: string;
    [key: string]: string;
  };
  notFound?: {
    title: string;
    message: string;
    [key: string]: string;
  };
  about: any;
  contact: any;
  privacy: any;
  terms: any;
  tags: any;
};

// Default fallback dictionary (English)
const fallbackDictionary: Dictionary = {
  metadata: {
    title: "QuotesHub - Inspirational Quotes",
    description:
      "Discover a collection of inspirational quotes from famous authors and personalities.",
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
  terms: "Page Not Found",
  tags: "sooner",
};

// Create a dictionary object with all locales
const dictionaries = {
  en,
  es,
  ar,
  fr,
  pt,
};

export const getDictionary = async (locale: Locale) =>
  dictionaries[locale as keyof typeof dictionaries];
