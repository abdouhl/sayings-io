import { cache } from "react"
import sql from "./db"
import type { Quote } from "@/types/quote"

// Get all quotes with pagination
export const getQuotes = cache(async (lang: string, page = 1, limit = 10): Promise<Quote[]> => {
  try {
    const offset = (page - 1) * limit

    // First, check if the tags column exists
    let hasTagsColumn = false
    try {
      const columnCheck = await sql`
        SELECT column_name 
        FROM information_schema.columns 
        WHERE table_name = 'quotes' AND column_name = 'tags'
      `
      hasTagsColumn = (columnCheck as any[]).length > 0
    } catch (error) {
      console.error("Error checking for tags column:", error)
      // Continue without tags
    }

    // Use different queries based on whether tags column exists
    let quotes
    if (hasTagsColumn) {
      quotes = await sql`
      SELECT q.id, q.text, q.tags, a.username as author_username, a.name as author_name, a.avatar as author_avatar
      FROM quotes q
      JOIN authors a ON q.author_username = a.username
      WHERE q.language = ${lang}
      ORDER BY q.created_at DESC
      LIMIT ${limit} OFFSET ${offset}
    `
    } else {
      quotes = await sql`
        SELECT q.id, q.text, a.username as author_username, a.name as author_name, a.avatar as author_avatar
        FROM quotes q
        JOIN authors a ON q.author_username = a.username
        WHERE q.language = ${lang}
        ORDER BY q.created_at DESC
        LIMIT ${limit} OFFSET ${offset}
      `
    }

    return (quotes as any[]).map((q) => ({
      id: q.id,
      text: q.text,
      tags: q.tags || [],
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
    // First, check if the tags column exists
    let hasTagsColumn = false
    try {
      const columnCheck = await sql`
        SELECT column_name 
        FROM information_schema.columns 
        WHERE table_name = 'quotes' AND column_name = 'tags'
      `
      hasTagsColumn = (columnCheck as any[]).length > 0
    } catch (error) {
      console.error("Error checking for tags column:", error)
      // Continue without tags
    }

    // Use different queries based on whether tags column exists
    let quotes
    if (hasTagsColumn) {
      quotes = await sql`
      SELECT q.id, q.text, q.tags, a.username as author_username, a.name as author_name, a.avatar as author_avatar
      FROM quotes q
      JOIN authors a ON q.author_username = a.username
      WHERE q.id = ${id}::uuid AND q.language = ${lang}
    `
    } else {
      quotes = await sql`
        SELECT q.id, q.text, a.username as author_username, a.name as author_name, a.avatar as author_avatar
        FROM quotes q
        JOIN authors a ON q.author_username = a.username
        WHERE q.id = ${id}::uuid AND q.language = ${lang}
      `
    }

    if ((quotes as any[]).length === 0) {
      return null
    }

    const q = (quotes as any[])[0]
    return {
      id: q.id,
      text: q.text,
      tags: q.tags || [],
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
    return Number.parseInt((result as any[])[0].count)
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

    return (quotes as any[]).map((quote) => ({
      id: quote.id,
    }))
  } catch (error) {
    console.error("Error generating static params for quotes:", error)
    return []
  }
}

