import { cache } from "react";
import sql from "./db";
import type { Author } from "@/types/quote";

// Get all authors who have quotes in the specified language with pagination
export const getAuthors = cache(
  async (
    lang: string,
    page = 1,
    limit = 12,
  ): Promise<(Author & { quoteCount: number })[]> => {
    try {
      const offset = (page - 1) * limit;

      // Check if the new author columns exist
      let hasNewColumns = false;
      try {
        const columnCheck = await sql`
        SELECT column_name 
        FROM information_schema.columns 
        WHERE table_name = 'authors' AND column_name = 'bio'
      `;
        hasNewColumns = (columnCheck as any[]).length > 0;
      } catch (error) {
        console.error("Error checking for new author columns:", error);
        // Continue without new columns
      }

      let authors;
      if (hasNewColumns) {
        authors = await sql`
      SELECT a.username, a.name, a.avatar, a.bio, a.website, a.twitter, a.instagram, a.facebook, COUNT(q.id) as quote_count
      FROM authors a
      JOIN quotes q ON a.username = q.author_username AND q.language = ${lang}
      GROUP BY a.username, a.name, a.avatar, a.bio, a.website, a.twitter, a.instagram, a.facebook
      HAVING COUNT(q.id) > 0
      ORDER BY a.name
      LIMIT ${limit} OFFSET ${offset}
   `;
      } else {
        authors = await sql`
        SELECT a.username, a.name, a.avatar, COUNT(q.id) as quote_count
        FROM authors a
        JOIN quotes q ON a.username = q.author_username AND q.language = ${lang}
        GROUP BY a.username, a.name, a.avatar
        HAVING COUNT(q.id) > 0
        ORDER BY a.name
        LIMIT ${limit} OFFSET ${offset}
     `;
      }

      return (authors as any[]).map((a) => ({
        username: a.username,
        name: a.name,
        avatar: a.avatar,
        bio: a.bio || null,
        website: a.website || null,
        twitter: a.twitter || null,
        instagram: a.instagram || null,
        facebook: a.facebook || null,
        quoteCount: Number.parseInt(a.quote_count),
      }));
    } catch (error) {
      console.error("Error fetching authors:", error);
      return [];
    }
  },
);

// Count total authors
export const countAuthors = cache(async (lang: string): Promise<number> => {
  try {
    const result = await sql`
      SELECT COUNT(DISTINCT a.username) as count
      FROM authors a
      JOIN quotes q ON a.username = q.author_username AND q.language = ${lang}
    `;
    return Number.parseInt((result as any[])[0].count);
  } catch (error) {
    console.error("Error counting authors:", error);
    return 0;
  }
});

// Get author by username
export const getAuthorByUsername = cache(
  async (username: string, lang: string): Promise<Author | null> => {
    try {
      // Check if the new author columns exist
      let hasNewColumns = false;
      try {
        const columnCheck = await sql`
        SELECT column_name 
        FROM information_schema.columns 
        WHERE table_name = 'authors' AND column_name = 'bio'
      `;
        hasNewColumns = (columnCheck as any[]).length > 0;
      } catch (error) {
        console.error("Error checking for new author columns:", error);
        // Continue without new columns
      }

      let authors;
      if (hasNewColumns) {
        authors = await sql`
      SELECT username, name, avatar, bio, website, twitter, instagram, facebook
      FROM authors
      WHERE username = ${username}
    `;
      } else {
        authors = await sql`
        SELECT username, name, avatar
        FROM authors
        WHERE username = ${username}
      `;
      }

      if ((authors as any[]).length === 0) {
        return null;
      }

      const a = (authors as any[])[0];
      return {
        username: a.username,
        name: a.name,
        avatar: a.avatar,
        bio: a.bio || null,
        website: a.website || null,
        twitter: a.twitter || null,
        instagram: a.instagram || null,
        facebook: a.facebook || null,
      };
    } catch (error) {
      console.error("Error fetching author by username:", error);
      return null;
    }
  },
);

// Get quotes by author with pagination
export const getQuotesByAuthor = cache(
  async (
    username: string,
    lang: string,
    page = 1,
    limit = 9,
  ): Promise<any[]> => {
    try {
      const offset = (page - 1) * limit;

      // Check if the tags column exists
      let hasTagsColumn = false;
      try {
        const columnCheck = await sql`
        SELECT column_name 
        FROM information_schema.columns 
        WHERE table_name = 'quotes' AND column_name = 'tags'
      `;
        hasTagsColumn = (columnCheck as any[]).length > 0;
      } catch (error) {
        console.error("Error checking for tags column:", error);
        // Continue without tags
      }

      let quotes;
      if (hasTagsColumn) {
        quotes = await sql`
      SELECT q.id, q.text, q.tags, a.username as author_username, a.name as author_name, a.avatar as author_avatar
      FROM quotes q
      JOIN authors a ON q.author_username = a.username
      WHERE q.author_username = ${username} AND q.language = ${lang}
      ORDER BY q.created_at DESC
      LIMIT ${limit} OFFSET ${offset}
    `;
      } else {
        quotes = await sql`
        SELECT q.id, q.text, a.username as author_username, a.name as author_name, a.avatar as author_avatar
        FROM quotes q
        JOIN authors a ON q.author_username = a.username
        WHERE q.author_username = ${username} AND q.language = ${lang}
        ORDER BY q.created_at DESC
        LIMIT ${limit} OFFSET ${offset} 
      `;
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
      }));
    } catch (error) {
      console.error("Error fetching quotes by author:", error);
      return [];
    }
  },
);

// Count quotes by author
export const countQuotesByAuthor = cache(
  async (username: string, lang: string): Promise<number> => {
    try {
      const result = await sql`
      SELECT COUNT(*) as count 
      FROM quotes 
      WHERE author_username = ${username} AND language = ${lang}
    `;
      return Number.parseInt((result as any[])[0].count);
    } catch (error) {
      console.error("Error counting quotes by author:", error);
      return 0;
    }
  },
);

// Generate static params for ISR
export async function generateStaticParams() {
  try {
    const authors = await sql`
      SELECT username FROM authors LIMIT 100
    `;

    return (authors as any[]).map((author) => ({
      id: author.username,
    }));
  } catch (error) {
    console.error("Error generating static params for authors:", error);
    return [];
  }
}
