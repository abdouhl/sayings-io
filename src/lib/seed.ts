import sql from "./db"

// Initial seed data
const seedData = {
  authors: [
    {
      username: "nelson_mandela",
      name: "Nelson Mandela",
      avatar: "/placeholder.svg?height=80&width=80",
      bio: "Nelson Rolihlahla Mandela was a South African anti-apartheid revolutionary, political leader and philanthropist who served as President of South Africa from 1994 to 1999. He was the country's first black head of state and the first elected in a fully representative democratic election.",
      website: "https://www.nelsonmandela.org",
      twitter: "NelsonMandela",
      instagram: "nelsonmandelafoundation",
      facebook: "NelsonMandela",
      quotes: {
        en: [
          {
            text: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
            tags: ["inspiration", "perseverance", "life"],
          },
          {
            text: "Education is the most powerful weapon which you can use to change the world.",
            tags: ["education", "change", "power"],
          },
          {
            text: "It always seems impossible until it's done.",
            tags: ["motivation", "achievement", "perseverance"],
          },
        ],
        es: [
          {
            text: "La mayor gloria de vivir no está en no caer nunca, sino en levantarnos cada vez que caemos.",
            tags: ["inspiración", "perseverancia", "vida"],
          },
          {
            text: "La educación es el arma más poderosa que puedes usar para cambiar el mundo.",
            tags: ["educación", "cambio", "poder"],
          },
          {
            text: "Siempre parece imposible hasta que se hace.",
            tags: ["motivación", "logro", "perseverancia"],
          },
        ],
        ar: [
          {
            text: "أعظم مجد في الحياة لا يكمن في عدم السقوط أبدًا، بل في النهوض في كل مرة نسقط فيها.",
            tags: ["إلهام", "مثابرة", "حياة"],
          },
          {
            text: "التعليم هو السلاح الأقوى الذي يمكنك استخدامه لتغيير العالم.",
            tags: ["تعليم", "تغيير", "قوة"],
          },
          {
            text: "دائما ما يبدو مستحيلا حتى يتم إنجازه.",
            tags: ["تحفيز", "إنجاز", "مثابرة"],
          },
        ],
        fr: [
          {
            text: "La plus grande gloire dans la vie ne réside pas dans le fait de ne jamais tomber, mais dans celui de se relever à chaque fois que nous tombons.",
            tags: ["inspiration", "persévérance", "vie"],
          },
          {
            text: "L'éducation est l'arme la plus puissante que vous puissiez utiliser pour changer le monde.",
            tags: ["éducation", "changement", "pouvoir"],
          },
          {
            text: "Cela semble toujours impossible jusqu'à ce que ce soit fait.",
            tags: ["motivation", "accomplissement", "persévérance"],
          },
        ],
      },
    },
    {
      username: "walt_disney",
      name: "Walt Disney",
      avatar: "/placeholder.svg?height=80&width=80",
      bio: "Walter Elias Disney was an American entrepreneur, animator, writer, voice actor and film producer who co-founded The Walt Disney Company. A pioneer of the American animation industry, he introduced several developments in the production of cartoons.",
      website: "https://thewaltdisneycompany.com",
      twitter: "Disney",
      instagram: "disney",
      facebook: "Disney",
      quotes: {
        en: [
          {
            text: "The way to get started is to quit talking and begin doing.",
            tags: ["action", "motivation", "success"],
          },
          {
            text: "All our dreams can come true, if we have the courage to pursue them.",
            tags: ["dreams", "courage", "inspiration"],
          },
          {
            text: "The more you like yourself, the less you are like anyone else, which makes you unique.",
            tags: ["self-love", "uniqueness", "individuality"],
          },
        ],
        es: [
          {
            text: "La forma de empezar es dejar de hablar y comenzar a hacer.",
            tags: ["acción", "motivación", "éxito"],
          },
          {
            text: "Todos nuestros sueños pueden hacerse realidad, si tenemos el coraje de perseguirlos.",
            tags: ["sueños", "coraje", "inspiración"],
          },
          {
            text: "Cuanto más te gustes a ti mismo, menos te parecerás a cualquier otra persona, lo que te hace único.",
            tags: ["amor propio", "singularidad", "individualidad"],
          },
        ],
        ar: [
          {
            text: "الطريقة للبدء هي التوقف عن الكلام والبدء في العمل.",
            tags: ["عمل", "تحفيز", "نجاح"],
          },
          {
            text: "يمكن أن تتحقق جميع أحلامنا إذا كان لدينا الشجاعة لمتابعتها.",
            tags: ["أحلام", "شجاعة", "إلهام"],
          },
          {
            text: "كلما أحببت نفسك أكثر، كلما كنت أقل شبهاً بأي شخص آخر، مما يجعلك فريداً.",
            tags: ["حب الذات", "تفرد", "فردية"],
          },
        ],
        fr: [
          {
            text: "La façon de commencer est d'arrêter de parler et de commencer à agir.",
            tags: ["action", "motivation", "succès"],
          },
          {
            text: "Tous nos rêves peuvent devenir réalité si nous avons le courage de les poursuivre.",
            tags: ["rêves", "courage", "inspiration"],
          },
          {
            text: "Plus vous vous aimez, moins vous ressemblez à quelqu'un d'autre, ce qui vous rend unique.",
            tags: ["amour de soi", "unicité", "individualité"],
          },
        ],
      },
    },
    {
      username: "steve_jobs",
      name: "Steve Jobs",
      avatar: "/placeholder.svg?height=80&width=80",
      bio: "Steven Paul Jobs was an American business magnate, industrial designer, investor, and media proprietor. He was the chairman, chief executive officer, and co-founder of Apple Inc. Jobs is widely recognized as a pioneer of the personal computer revolution of the 1970s and 1980s.",
      website: "https://www.apple.com",
      twitter: "apple",
      instagram: "apple",
      facebook: "apple",
      quotes: {
        en: [
          {
            text: "Your time is limited, so don't waste it living someone else's life.",
            tags: ["time", "life", "authenticity"],
          },
          {
            text: "Innovation distinguishes between a leader and a follower.",
            tags: ["innovation", "leadership", "business"],
          },
          {
            text: "The only way to do great work is to love what you do.",
            tags: ["passion", "work", "success"],
          },
        ],
        es: [
          {
            text: "Tu tiempo es limitado, así que no lo desperdicies viviendo la vida de otra persona.",
            tags: ["tiempo", "vida", "autenticidad"],
          },
          {
            text: "La innovación distingue entre un líder y un seguidor.",
            tags: ["innovación", "liderazgo", "negocios"],
          },
          {
            text: "La única manera de hacer un gran trabajo es amar lo que haces.",
            tags: ["pasión", "trabajo", "éxito"],
          },
        ],
        ar: [
          {
            text: "وقتك محدود، لذا لا تضيعه في عيش حياة شخص آخر.",
            tags: ["وقت", "حياة", "أصالة"],
          },
          {
            text: "الابتكار هو ما يميز بين القائد والتابع.",
            tags: ["ابتكار", "قيادة", "أعمال"],
          },
          {
            text: "الطريقة الوحيدة للقيام بعمل عظيم هي أن تحب ما تفعله.",
            tags: ["شغف", "عمل", "نجاح"],
          },
        ],
        fr: [
          {
            text: "Votre temps est limité, ne le gaspillez pas en vivant la vie de quelqu'un d'autre.",
            tags: ["temps", "vie", "authenticité"],
          },
          {
            text: "L'innovation distingue le leader du suiveur.",
            tags: ["innovation", "leadership", "affaires"],
          },
          {
            text: "La seule façon de faire du bon travail est d'aimer ce que vous faites.",
            tags: ["passion", "travail", "succès"],
          },
        ],
      },
    },
    {
      username: "maya_angelou",
      name: "Maya Angelou",
      avatar: "/placeholder.svg?height=80&width=80",
      bio: "Maya Angelou was an American poet, memoirist, and civil rights activist. She published seven autobiographies, three books of essays, several books of poetry, and is credited with a list of plays, movies, and television shows spanning over 50 years.",
      website: "https://www.mayaangelou.com",
      twitter: "DrMayaAngelou",
      instagram: "drmayaangelou",
      facebook: "MayaAngelou",
      quotes: {
        en: [
          {
            text: "I've learned that people will forget what you said, people will forget what you did, but people will never forget how you made them feel.",
            tags: ["wisdom", "relationships", "impact"],
          },
          {
            text: "If you don't like something, change it. If you can't change it, change your attitude.",
            tags: ["change", "attitude", "wisdom"],
          },
          {
            text: "We may encounter many defeats but we must not be defeated.",
            tags: ["resilience", "perseverance", "strength"],
          },
        ],
        es: [
          {
            text: "He aprendido que la gente olvidará lo que dijiste, olvidará lo que hiciste, pero nunca olvidará cómo los hiciste sentir.",
            tags: ["sabiduría", "relaciones", "impacto"],
          },
          {
            text: "Si no te gusta algo, cámbialo. Si no puedes cambiarlo, cambia tu actitud.",
            tags: ["cambio", "actitud", "sabiduría"],
          },
          {
            text: "Podemos encontrar muchas derrotas, pero no debemos ser derrotados.",
            tags: ["resiliencia", "perseverancia", "fuerza"],
          },
        ],
        ar: [
          {
            text: "لقد تعلمت أن الناس سينسون ما قلته، وسينسون ما فعلته، لكنهم لن ينسوا أبدًا كيف جعلتهم يشعرون.",
            tags: ["حكمة", "علاقات", "تأثير"],
          },
          {
            text: "إذا كنت لا تحب شيئًا، غيره. إذا لم تستطع تغييره، غير موقفك.",
            tags: ["تغيير", "موقف", "حكمة"],
          },
          {
            text: "قد نواجه العديد من الهزائم ولكن يجب ألا نُهزم.",
            tags: ["مرونة", "مثابرة", "قوة"],
          },
        ],
        fr: [
          {
            text: "J'ai appris que les gens oublieront ce que vous avez dit, ils oublieront ce que vous avez fait, mais ils n'oublieront jamais ce que vous leur avez fait ressentir.",
            tags: ["sagesse", "relations", "impact"],
          },
          {
            text: "Si vous n'aimez pas quelque chose, changez-le. Si vous ne pouvez pas le changer, changez votre attitude.",
            tags: ["changement", "attitude", "sagesse"],
          },
          {
            text: "Nous pouvons rencontrer de nombreuses défaites, mais nous ne devons pas être vaincus.",
            tags: ["résilience", "persévérance", "force"],
          },
        ],
      },
    },
    {
      username: "albert_einstein",
      name: "Albert Einstein",
      avatar: "/placeholder.svg?height=80&width=80",
      bio: "Albert Einstein was a German-born theoretical physicist who developed the theory of relativity, one of the two pillars of modern physics. His work is also known for its influence on the philosophy of science.",
      website: "https://www.einstein-website.de",
      twitter: "AlbertEinstein",
      instagram: "alberteinstein_official",
      facebook: "AlbertEinstein",
      quotes: {
        en: [
          {
            text: "Imagination is more important than knowledge. Knowledge is limited. Imagination encircles the world.",
            tags: ["imagination", "knowledge", "creativity"],
          },
          {
            text: "Life is like riding a bicycle. To keep your balance, you must keep moving.",
            tags: ["life", "balance", "progress"],
          },
          {
            text: "The important thing is not to stop questioning. Curiosity has its own reason for existing.",
            tags: ["curiosity", "questioning", "science"],
          },
        ],
        es: [
          {
            text: "La imaginación es más importante que el conocimiento. El conocimiento es limitado. La imaginación rodea el mundo.",
            tags: ["imaginación", "conocimiento", "creatividad"],
          },
          {
            text: "La vida es como montar en bicicleta. Para mantener el equilibrio, debes seguir moviéndote.",
            tags: ["vida", "equilibrio", "progreso"],
          },
          {
            text: "Lo importante es no dejar de cuestionar. La curiosidad tiene su propia razón de existir.",
            tags: ["curiosidad", "cuestionamiento", "ciencia"],
          },
        ],
        ar: [
          {
            text: "الخيال أهم من المعرفة. المعرفة محدودة. الخيال يطوق العالم.",
            tags: ["خيال", "معرفة", "إبداع"],
          },
          {
            text: "الحياة مثل ركوب الدراجة. للحفاظ على توازنك، يجب أن تستمر في التحرك.",
            tags: ["حياة", "توازن", "تقدم"],
          },
          {
            text: "الشيء المهم هو عدم التوقف عن التساؤل. الفضول له سببه الخاص للوجود.",
            tags: ["فضول", "تساؤل", "علم"],
          },
        ],
        fr: [
          {
            text: "L'imagination est plus importante que la connaissance. La connaissance est limitée. L'imagination encercle le monde.",
            tags: ["imagination", "connaissance", "créativité"],
          },
          {
            text: "La vie, c'est comme une bicyclette, il faut avancer pour ne pas perdre l'équilibre.",
            tags: ["vie", "équilibre", "progrès"],
          },
          {
            text: "L'important est de ne pas arrêter de questionner. La curiosité a sa propre raison d'exister.",
            tags: ["curiosité", "questionnement", "science"],
          },
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

      if (Number.parseInt((existingAuthors as any[])[0].count) > 0) {
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
          bio TEXT,
          website VARCHAR(255),
          twitter VARCHAR(255),
          instagram VARCHAR(255),
          facebook VARCHAR(255),
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        )
      `

      await sql`
        CREATE TABLE IF NOT EXISTS quotes (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          text TEXT NOT NULL,
          author_username VARCHAR(255) NOT NULL REFERENCES authors(username) ON DELETE CASCADE,
          language VARCHAR(10) NOT NULL DEFAULT 'en',
          tags TEXT[],
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
        // Create author with new fields
        await sql`
          INSERT INTO authors (
            username, name, avatar, bio, website, twitter, instagram, facebook
          )
          VALUES (
            ${authorData.username}, 
            ${authorData.name}, 
            ${authorData.avatar}, 
            ${authorData.bio || null}, 
            ${authorData.website || null}, 
            ${authorData.twitter || null}, 
            ${authorData.instagram || null}, 
            ${authorData.facebook || null}
          )
        `

        console.log(`Author ${authorData.name} created`)

        // Create quotes for each language with tags
        for (const [lang, quotes] of Object.entries(authorData.quotes)) {
          for (const quote of quotes) {
            const quoteText = typeof quote === "string" ? quote : quote.text
            const tags = typeof quote === "string" ? null : quote.tags || null

            await sql`
              INSERT INTO quotes (text, author_username, language, tags)
              VALUES (${quoteText}, ${authorData.username}, ${lang}, ${tags})
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



