import { cache } from "react";
import sql from "./db";
import type { Quote } from "@/types/quote";

// Count total tags
export const countTags = cache(async (lang: string): Promise<number> => {
  try {
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
      return 0;
    }

    if (!hasTagsColumn) {
      return 0;
    }

    // Count distinct tags
    const result = await sql`
        WITH tag_counts AS (
        SELECT unnest(tags) as tag
        FROM quotes
        WHERE language = ${lang} AND tags IS NOT NULL
      )
      SELECT COUNT(DISTINCT tag) as count
      FROM tag_counts
    `;
    return Number.parseInt((result as any[])[0].count);
  } catch (error) {
    console.error("Error counting tags:", error);
    return 0;
  }
});

// Get all tags with their quote counts with pagination and sorting
export const getAllTags = cache(
  async (
    lang: string,
    page = 1,
    limit = 30,
    sortBy: "count" | "name" = "count",
  ): Promise<{ name: string; count: number }[]> => {
    try {
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
        return [];
      }

      if (!hasTagsColumn) {
        return [];
      }

      const offset = (page - 1) * limit;

      // Get all tags and their counts with pagination and sorting
      const orderClause =
        sortBy === "name" ? "ORDER BY name" : "ORDER BY count DESC, name";

      // Use parameterized query instead of unsafe
      let result;

      if (sortBy === "name") {
        result = await sql`
          WITH tag_counts AS (
            SELECT unnest(tags) as tag, COUNT(*) as count
            FROM quotes
            WHERE language = ${lang} AND tags IS NOT NULL
            GROUP BY tag
          )
          SELECT tag as name, count
          FROM tag_counts
          ORDER BY name
          LIMIT ${limit} OFFSET ${offset}
        `;
      } else {
        result = await sql`
      WITH tag_counts AS (
        SELECT unnest(tags) as tag, COUNT(*) as count
        FROM quotes
        WHERE language = ${lang} AND tags IS NOT NULL
        GROUP BY tag
      )
      SELECT tag as name, count
      FROM tag_counts
      ORDER BY count DESC, name
      LIMIT ${limit} OFFSET ${offset}
    `;
      }

      // Ensure result is an array and map it
      if (!Array.isArray(result)) {
        console.error("Expected array result but got:", typeof result);
        return [];
      }

      return (result as unknown as any[]).map((row) => ({
        name: row.name,
        count: Number.parseInt(row.count),
      }));
    } catch (error) {
      console.error("Error fetching all tags:", error);
      return [];
    }
  },
);

// Get popular tags (limited number)
export const getPopularTags = cache(
  async (
    lang: string,
    limit = 10,
  ): Promise<{ name: string; count: number }[]> => {
    try {
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
        return [];
      }

      if (!hasTagsColumn) {
        return [];
      }

      // Get popular tags
      const result = await sql`
      WITH tag_counts AS (
        SELECT unnest(tags) as tag, COUNT(*) as count
        FROM quotes
        WHERE language = ${lang} AND tags IS NOT NULL
        GROUP BY tag
      )
      SELECT tag as name, count
      FROM tag_counts
      ORDER BY count DESC, name
      LIMIT ${limit}
    `;

      return (result as any[]).map((row) => ({
        name: row.name,
        count: Number.parseInt(row.count),
      }));
    } catch (error) {
      console.error("Error fetching popular tags:", error);
      return [];
    }
  },
);

// Get quotes by tag with pagination
export const getQuotesByTag = cache(
  async (tag: string, lang: string, page = 1, limit = 9): Promise<Quote[]> => {
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
        return [];
      }

      if (!hasTagsColumn) {
        return [];
      }

      // Get quotes with the specified tag
      const quotes = await sql`
      SELECT q.id, q.text, q.tags, a.username as author_username, a.name as author_name, a.avatar as author_avatar
      FROM quotes q
      JOIN authors a ON q.author_username = a.username
      WHERE q.language = ${lang} AND ${tag} = ANY(q.tags)
      ORDER BY q.created_at DESC
      LIMIT ${limit} OFFSET ${offset}
    `;

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
      console.error("Error fetching quotes by tag:", error);
      return [];
    }
  },
);

// Count quotes by tag
export const countQuotesByTag = cache(
  async (tag: string, lang: string): Promise<number> => {
    try {
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
        return 0;
      }

      if (!hasTagsColumn) {
        return 0;
      }

      const result = await sql`
      SELECT COUNT(*) as count
      FROM quotes
      WHERE language = ${lang} AND ${tag} = ANY(tags)
    `;
      return Number.parseInt((result as any[])[0].count);
    } catch (error) {
      console.error("Error counting quotes by tag:", error);
      return 0;
    }
  },
);
