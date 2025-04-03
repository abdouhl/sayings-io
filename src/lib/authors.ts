import { cache } from "react"
import sql from "./db"
import type { Author } from "@/types/quote"

// Get all authors
export const getAuthors = cache(async (lang: string): Promise<(Author & { quoteCount: number })[]> => {
  try {
    const authors = await sql`
      SELECT a.username, a.name, a.avatar, COUNT(q.id) as quote_count
      FROM authors a
      LEFT JOIN quotes q ON a.username = q.author_username AND q.language = ${lang}
      GROUP BY a.username, a.name, a.avatar
      ORDER BY a.name
    `

    return (authors as any[]).map((a) => ({
      username: a.username,
      name: a.name,
      avatar: a.avatar,
      quoteCount: Number.parseInt(a.quote_count),
    }))
  } catch (error) {
    console.error("Error fetching authors:", error)
    return []
  }
})

// Get author by username
export const getAuthorByUsername = cache(async (username: string, lang: string): Promise<Author | null> => {
  try {
    const authors = await sql`
      SELECT username, name, avatar
      FROM authors
      WHERE username = ${username}
    `

    if ((authors as any[]).length === 0) {
      return null
    }

    const a = (authors as any[])[0]
    return {
      username: a.username,
      name: a.name,
      avatar: a.avatar,
    }
  } catch (error) {
    console.error("Error fetching author by username:", error)
    return null
  }
})

// Get quotes by author
export const getQuotesByAuthor = cache(async (username: string, lang: string): Promise<any[]> => {
  try {
    const quotes = await sql`
      SELECT q.id, q.text, a.username as author_username, a.name as author_name, a.avatar as author_avatar
      FROM quotes q
      JOIN authors a ON q.author_username = a.username
      WHERE q.author_username = ${username} AND q.language = ${lang}
      ORDER BY q.created_at DESC
    `

    return (quotes as any[]).map((q) => ({
      id: q.id,
      text: q.text,
      author: {
        username: q.author_username,
        name: q.author_name,
        avatar: q.author_avatar,
      },
    }))
  } catch (error) {
    console.error("Error fetching quotes by author:", error)
    return []
  }
})

// Generate static params for ISR
export async function generateStaticParams() {
  try {
    const authors = await sql`
      SELECT username FROM authors LIMIT 100
    `

    return (authors as any[]).map((author) => ({
      id: author.username,
    }))
  } catch (error) {
    console.error("Error generating static params for authors:", error)
    return []
  }
}

