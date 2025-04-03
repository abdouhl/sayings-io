import { cache } from "react"
import sql from "./db"
import type { Quote } from "@/types/quote"

// Get all quotes with pagination
export const getQuotes = cache(async (lang: string, page = 1, limit = 10): Promise<Quote[]> => {
  try {
    const offset = (page - 1) * limit

    const quotes = await sql`
      SELECT q.id, q.text, a.username as author_username, a.name as author_name, a.avatar as author_avatar
      FROM quotes q
      JOIN authors a ON q.author_username = a.username
      WHERE q.language = ${lang}
      ORDER BY q.created_at DESC
      LIMIT ${limit} OFFSET ${offset}
    `

    return quotes.map((q) => ({
      id: q.id,
      text: q.text,
      author: {
        username: q.author_username,
        name: q.author_name,
        avatar: q.author_avatar,
      },
    }))
  } catch (error) {
    console.error("Error fetching quotes:", error)
    // Return empty array instead of throwing to prevent page from crashing
    return []
  }
})

// Get quote by ID
export const getQuoteById = cache(async (id: string, lang: string): Promise<Quote | null> => {
  try {
    const quotes = await sql`
      SELECT q.id, q.text, a.username as author_username, a.name as author_name, a.avatar as author_avatar
      FROM quotes q
      JOIN authors a ON q.author_username = a.username
      WHERE q.id = ${id}::uuid AND q.language = ${lang}
    `

    if (quotes.length === 0) {
      return null
    }

    const q = quotes[0]
    return {
      id: q.id,
      text: q.text,
      author: {
        username: q.author_username,
        name: q.author_name,
        avatar: q.author_avatar,
      },
    }
  } catch (error) {
    console.error("Error fetching quote by ID:", error)
    return null
  }
})

// Count total quotes
export const countQuotes = cache(async (lang: string): Promise<number> => {
  try {
    const result = await sql`
      SELECT COUNT(*) as count FROM quotes WHERE language = ${lang}
    `
    return Number.parseInt(result[0].count)
  } catch (error) {
    console.error("Error counting quotes:", error)
    return 0
  }
})

// Generate static params for ISR
export async function generateStaticParams() {
  try {
    const quotes = await sql`
      SELECT id FROM quotes LIMIT 100
    `

    return quotes.map((quote) => ({
      id: quote.id,
    }))
  } catch (error) {
    console.error("Error generating static params for quotes:", error)
    return []
  }
}

