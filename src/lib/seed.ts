import sql from "./db"

// Initial seed data
const seedData = {
  authors: [
    {
      username: "nelson_mandela",
      name: "Nelson Mandela",
      avatar: "/placeholder.svg?height=80&width=80",
      quotes: {
        en: [
          "The greatest glory in living lies not in never falling, but in rising every time we fall.",
          "Education is the most powerful weapon which you can use to change the world.",
        ],
        es: [
          "La mayor gloria de vivir no está en no caer nunca, sino en levantarnos cada vez que caemos.",
          "La educación es el arma más poderosa que puedes usar para cambiar el mundo.",
        ],
        ar: [
          "أعظم مجد في الحياة لا يكمن في عدم السقوط أبدًا، بل في النهوض في كل مرة نسقط فيها.",
          "التعليم هو السلاح الأقوى الذي يمكنك استخدامه لتغيير العالم.",
        ],
        fr: [
          "La plus grande gloire dans la vie ne réside pas dans le fait de ne jamais tomber, mais dans celui de se relever à chaque fois que nous tombons.",
          "L'éducation est l'arme la plus puissante que vous puissiez utiliser pour changer le monde.",
        ],
      },
    },
    {
      username: "walt_disney",
      name: "Walt Disney",
      avatar: "/placeholder.svg?height=80&width=80",
      quotes: {
        en: [
          "The way to get started is to quit talking and begin doing.",
          "All our dreams can come true, if we have the courage to pursue them.",
        ],
        es: [
          "La forma de empezar es dejar de hablar y comenzar a hacer.",
          "Todos nuestros sueños pueden hacerse realidad, si tenemos el coraje de perseguirlos.",
        ],
        ar: [
          "الطريقة للبدء هي التوقف عن الكلام والبدء في العمل.",
          "يمكن أن تتحقق جميع أحلامنا إذا كان لدينا الشجاعة لمتابعتها.",
        ],
        fr: [
          "La façon de commencer est d'arrêter de parler et de commencer à agir.",
          "Tous nos rêves peuvent devenir réalité si nous avons le courage de les poursuivre.",
        ],
      },
    },
    {
      username: "steve_jobs",
      name: "Steve Jobs",
      avatar: "/placeholder.svg?height=80&width=80",
      quotes: {
        en: [
          "Your time is limited, so don't waste it living someone else's life.",
          "Innovation distinguishes between a leader and a follower.",
        ],
        es: [
          "Tu tiempo es limitado, así que no lo desperdicies viviendo la vida de otra persona.",
          "La innovación distingue entre un líder y un seguidor.",
        ],
        ar: ["وقتك محدود، لذا لا تضيعه في عيش حياة شخص آخر.", "الابتكار هو ما يميز بين القائد والتابع."],
        fr: [
          "Votre temps est limité, ne le gaspillez pas en vivant la vie de quelqu'un d'autre.",
          "L'innovation distingue le leader du suiveur.",
        ],
      },
    },
  ],
}

// Seed the database
export async function seedDatabase() {
  try {
    console.log("Starting database seeding...")

    // Check if tables exist
    try {
      // Check if database is already seeded
      const existingAuthors = await sql`SELECT COUNT(*) as count FROM authors`

      if (Number.parseInt(existingAuthors[0].count) > 0) {
        console.log("Database already seeded")
        return { success: true, message: "Database already seeded" }
      }
    } catch (error) {
      console.error("Error checking if tables exist:", error)
      // Tables might not exist yet, continue with seeding
    }

    // Create tables if they don't exist
    try {
      await sql`
        CREATE TABLE IF NOT EXISTS authors (
          username VARCHAR(255) PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          avatar VARCHAR(255) NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        )
      `

      await sql`
        CREATE TABLE IF NOT EXISTS quotes (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          text TEXT NOT NULL,
          author_username VARCHAR(255) NOT NULL REFERENCES authors(username) ON DELETE CASCADE,
          language VARCHAR(10) NOT NULL DEFAULT 'en',
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        )
      `

      await sql`
        CREATE INDEX IF NOT EXISTS idx_quotes_author_username ON quotes(author_username)
      `

      await sql`
        CREATE INDEX IF NOT EXISTS idx_quotes_language ON quotes(language)
      `

      console.log("Tables created successfully")
    } catch (error) {
      console.error("Error creating tables:", error)
      return { success: false, error: "Failed to create database tables" }
    }

    // Seed the database
    for (const authorData of seedData.authors) {
      try {
        // Create author
        await sql`
          INSERT INTO authors (username, name, avatar)
          VALUES (${authorData.username}, ${authorData.name}, ${authorData.avatar})
        `

        console.log(`Author ${authorData.name} created`)

        // Create quotes for each language
        for (const [lang, quotes] of Object.entries(authorData.quotes)) {
          for (const quoteText of quotes) {
            await sql`
              INSERT INTO quotes (text, author_username, language)
              VALUES (${quoteText}, ${authorData.username}, ${lang})
            `
          }
          console.log(`Added ${quotes.length} quotes for ${authorData.name} in ${lang}`)
        }
      } catch (error) {
        console.error(`Error creating author ${authorData.name}:`, error)
        // Continue with next author
      }
    }

    console.log("Database seeded successfully")
    return { success: true, message: "Database seeded successfully" }
  } catch (error) {
    console.error("Error seeding database:", error)
    return {
      success: false,
      error: "Failed to seed database: " + (error instanceof Error ? error.message : String(error)),
    }
  }
}

