export function QuoteStructuredData({
  quote,
  lang,
  baseUrl = "https://yourdomain.com",
}: {
  quote: {
    id: string
    text: string
    author: {
      username: string
      name: string
    }
  }
  lang: string
  baseUrl?: string
}) {
  const quoteUrl = `${baseUrl}/${lang}/quotes/${quote.id}`
  const authorUrl = `${baseUrl}/${lang}/authors/${quote.author.username}`

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Quotation",
    text: quote.text,
    author: {
      "@type": "Person",
      name: quote.author.name,
      url: authorUrl,
    },
    url: quoteUrl,
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
}

export function AuthorStructuredData({
  author,
  quotes,
  lang,
  baseUrl = "https://yourdomain.com",
}: {
  author: {
    username: string
    name: string
  }
  quotes: Array<{ id: string; text: string }>
  lang: string
  baseUrl?: string
}) {
  const authorUrl = `${baseUrl}/${lang}/authors/${author.username}`

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: author.name,
    url: authorUrl,
    knowsAbout: quotes.map((quote) => quote.text),
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
}

export function WebsiteStructuredData({
  baseUrl = "https://yourdomain.com",
}: {
  baseUrl?: string
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: baseUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
}

