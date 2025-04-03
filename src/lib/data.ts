import type { Quote, Author } from "@/types/quote"

// Mock data for quotes in English
const quotesEn: Quote[] = [
  {
    id: "1",
    text: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
    author: {
      id: "1",
      name: "Nelson Mandela",
      avatar: "/placeholder.svg?height=80&width=80",
    },
  },
  {
    id: "2",
    text: "The way to get started is to quit talking and begin doing.",
    author: {
      id: "2",
      name: "Walt Disney",
      avatar: "/placeholder.svg?height=80&width=80",
    },
  },
  {
    id: "3",
    text: "Your time is limited, so don't waste it living someone else's life.",
    author: {
      id: "3",
      name: "Steve Jobs",
      avatar: "/placeholder.svg?height=80&width=80",
    },
  },
  {
    id: "4",
    text: "If life were predictable it would cease to be life, and be without flavor.",
    author: {
      id: "4",
      name: "Eleanor Roosevelt",
      avatar: "/placeholder.svg?height=80&width=80",
    },
  },
  {
    id: "5",
    text: "If you look at what you have in life, you'll always have more. If you look at what you don't have in life, you'll never have enough.",
    author: {
      id: "5",
      name: "Oprah Winfrey",
      avatar: "/placeholder.svg?height=80&width=80",
    },
  },
  {
    id: "6",
    text: "Life is what happens when you're busy making other plans.",
    author: {
      id: "6",
      name: "John Lennon",
      avatar: "/placeholder.svg?height=80&width=80",
    },
  },
  {
    id: "7",
    text: "Education is the most powerful weapon which you can use to change the world.",
    author: {
      id: "1",
      name: "Nelson Mandela",
      avatar: "/placeholder.svg?height=80&width=80",
    },
  },
  {
    id: "8",
    text: "All our dreams can come true, if we have the courage to pursue them.",
    author: {
      id: "2",
      name: "Walt Disney",
      avatar: "/placeholder.svg?height=80&width=80",
    },
  },
  {
    id: "9",
    text: "Innovation distinguishes between a leader and a follower.",
    author: {
      id: "3",
      name: "Steve Jobs",
      avatar: "/placeholder.svg?height=80&width=80",
    },
  },
]

// Mock data for quotes in Spanish
const quotesEs: Quote[] = [
  {
    id: "1",
    text: "La mayor gloria de vivir no está en no caer nunca, sino en levantarnos cada vez que caemos.",
    author: {
      id: "1",
      name: "Nelson Mandela",
      avatar: "/placeholder.svg?height=80&width=80",
    },
  },
  {
    id: "2",
    text: "La forma de empezar es dejar de hablar y comenzar a hacer.",
    author: {
      id: "2",
      name: "Walt Disney",
      avatar: "/placeholder.svg?height=80&width=80",
    },
  },
  {
    id: "3",
    text: "Tu tiempo es limitado, así que no lo desperdicies viviendo la vida de otra persona.",
    author: {
      id: "3",
      name: "Steve Jobs",
      avatar: "/placeholder.svg?height=80&width=80",
    },
  },
  {
    id: "4",
    text: "Si la vida fuera predecible, dejaría de ser vida y no tendría sabor.",
    author: {
      id: "4",
      name: "Eleanor Roosevelt",
      avatar: "/placeholder.svg?height=80&width=80",
    },
  },
  {
    id: "5",
    text: "Si miras lo que tienes en la vida, siempre tendrás más. Si miras lo que no tienes en la vida, nunca tendrás suficiente.",
    author: {
      id: "5",
      name: "Oprah Winfrey",
      avatar: "/placeholder.svg?height=80&width=80",
    },
  },
  {
    id: "6",
    text: "La vida es lo que pasa mientras estás ocupado haciendo otros planes.",
    author: {
      id: "6",
      name: "John Lennon",
      avatar: "/placeholder.svg?height=80&width=80",
    },
  },
  {
    id: "7",
    text: "La educación es el arma más poderosa que puedes usar para cambiar el mundo.",
    author: {
      id: "1",
      name: "Nelson Mandela",
      avatar: "/placeholder.svg?height=80&width=80",
    },
  },
  {
    id: "8",
    text: "Todos nuestros sueños pueden hacerse realidad si tenemos el coraje de perseguirlos.",
    author: {
      id: "2",
      name: "Walt Disney",
      avatar: "/placeholder.svg?height=80&width=80",
    },
  },
  {
    id: "9",
    text: "La innovación distingue entre un líder y un seguidor.",
    author: {
      id: "3",
      name: "Steve Jobs",
      avatar: "/placeholder.svg?height=80&width=80",
    },
  },
]

// Mock data for quotes in Arabic
const quotesAr: Quote[] = [
  {
    id: "1",
    text: "أعظم مجد في الحياة لا يكمن في عدم السقوط أبدًا، بل في النهوض في كل مرة نسقط فيها.",
    author: {
      id: "1",
      name: "نيلسون مانديلا",
      avatar: "/placeholder.svg?height=80&width=80",
    },
  },
  {
    id: "2",
    text: "الطريقة للبدء هي التوقف عن الكلام والبدء في العمل.",
    author: {
      id: "2",
      name: "والت ديزني",
      avatar: "/placeholder.svg?height=80&width=80",
    },
  },
  {
    id: "3",
    text: "وقتك محدود، لذا لا تضيعه في عيش حياة شخص آخر.",
    author: {
      id: "3",
      name: "ستيف جوبز",
      avatar: "/placeholder.svg?height=80&width=80",
    },
  },
  {
    id: "4",
    text: "إذا كانت الحياة متوقعة، فستتوقف عن كونها حياة وستكون بلا نكهة.",
    author: {
      id: "4",
      name: "إليانور روزفلت",
      avatar: "/placeholder.svg?height=80&width=80",
    },
  },
  {
    id: "5",
    text: "إذا نظرت إلى ما لديك في الحياة، فسيكون لديك دائمًا المزيد. إذا نظرت إلى ما لا تملكه في الحياة، فلن يكون لديك ما يكفي أبدًا.",
    author: {
      id: "5",
      name: "أوبرا وينفري",
      avatar: "/placeholder.svg?height=80&width=80",
    },
  },
  {
    id: "6",
    text: "الحياة هي ما يحدث عندما تكون مشغولاً بوضع خطط أخرى.",
    author: {
      id: "6",
      name: "جون لينون",
      avatar: "/placeholder.svg?height=80&width=80",
    },
  },
  {
    id: "7",
    text: "التعليم هو السلاح الأقوى الذي يمكنك استخدامه لتغيير العالم.",
    author: {
      id: "1",
      name: "نيلسون مانديلا",
      avatar: "/placeholder.svg?height=80&width=80",
    },
  },
  {
    id: "8",
    text: "يمكن أن تتحقق جميع أحلامنا إذا كان لدينا الشجاعة لمتابعتها.",
    author: {
      id: "2",
      name: "والت ديزني",
      avatar: "/placeholder.svg?height=80&width=80",
    },
  },
  {
    id: "9",
    text: "الابتكار هو ما يميز بين القائد والتابع.",
    author: {
      id: "3",
      name: "ستيف جوبز",
      avatar: "/placeholder.svg?height=80&width=80",
    },
  },
]

// Add French quotes to the data
const quotesFr: Quote[] = [
  {
    id: "1",
    text: "La plus grande gloire dans la vie ne réside pas dans le fait de ne jamais tomber, mais dans celui de se relever à chaque fois que nous tombons.",
    author: {
      id: "1",
      name: "Nelson Mandela",
      avatar: "/placeholder.svg?height=80&width=80",
    },
  },
  {
    id: "2",
    text: "La façon de commencer est d'arrêter de parler et de commencer à agir.",
    author: {
      id: "2",
      name: "Walt Disney",
      avatar: "/placeholder.svg?height=80&width=80",
    },
  },
  {
    id: "3",
    text: "Votre temps est limité, ne le gaspillez pas en vivant la vie de quelqu'un d'autre.",
    author: {
      id: "3",
      name: "Steve Jobs",
      avatar: "/placeholder.svg?height=80&width=80",
    },
  },
  {
    id: "4",
    text: "Si la vie était prévisible, elle cesserait d'être la vie et serait sans saveur.",
    author: {
      id: "4",
      name: "Eleanor Roosevelt",
      avatar: "/placeholder.svg?height=80&width=80",
    },
  },
  {
    id: "5",
    text: "Si vous regardez ce que vous avez dans la vie, vous en aurez toujours plus. Si vous regardez ce que vous n'avez pas dans la vie, vous n'en aurez jamais assez.",
    author: {
      id: "5",
      name: "Oprah Winfrey",
      avatar: "/placeholder.svg?height=80&width=80",
    },
  },
  {
    id: "6",
    text: "La vie est ce qui arrive pendant que vous êtes occupé à faire d'autres projets.",
    author: {
      id: "6",
      name: "John Lennon",
      avatar: "/placeholder.svg?height=80&width=80",
    },
  },
  {
    id: "7",
    text: "L'éducation est l'arme la plus puissante que vous puissiez utiliser pour changer le monde.",
    author: {
      id: "1",
      name: "Nelson Mandela",
      avatar: "/placeholder.svg?height=80&width=80",
    },
  },
  {
    id: "8",
    text: "Tous nos rêves peuvent devenir réalité si nous avons le courage de les poursuivre.",
    author: {
      id: "2",
      name: "Walt Disney",
      avatar: "/placeholder.svg?height=80&width=80",
    },
  },
  {
    id: "9",
    text: "L'innovation distingue le leader du suiveur.",
    author: {
      id: "3",
      name: "Steve Jobs",
      avatar: "/placeholder.svg?height=80&width=80",
    },
  },
]

// Update the getQuotes function to return French quotes
export async function getQuotes(lang: string): Promise<Quote[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))

  if (lang === "es") return quotesEs
  if (lang === "ar") return quotesAr
  if (lang === "fr") return quotesFr
  return quotesEn
}

// Get a quote by ID
export async function getQuoteById(id: string, lang: string): Promise<Quote | undefined> {
  const quotes = lang === "es" ? quotesEs : lang === "ar" ? quotesAr : quotesEn
  return quotes.find((quote) => quote.id === id)
}

// Get all authors with quote count
export async function getAuthors(lang: string): Promise<(Author & { quoteCount: number })[]> {
  const quotes = lang === "es" ? quotesEs : lang === "ar" ? quotesAr : quotesEn

  // Create a map of author IDs to authors with quote counts
  const authorMap = new Map<string, Author & { quoteCount: number }>()

  quotes.forEach((quote) => {
    const { id, name, avatar } = quote.author

    if (authorMap.has(id)) {
      authorMap.get(id)!.quoteCount++
    } else {
      authorMap.set(id, { id, name, avatar, quoteCount: 1 })
    }
  })

  // Convert the map to an array and sort by name
  return Array.from(authorMap.values()).sort((a, b) => a.name.localeCompare(b.name))
}

// Get an author by ID
export async function getAuthorById(id: string, lang: string): Promise<Author | undefined> {
  const quotes = lang === "es" ? quotesEs : lang === "ar" ? quotesAr : quotesEn
  const quote = quotes.find((quote) => quote.author.id === id)
  return quote?.author
}

// Get quotes by author ID
export async function getQuotesByAuthor(authorId: string, lang: string): Promise<Quote[]> {
  const quotes = lang === "es" ? quotesEs : lang === "ar" ? quotesAr : quotesEn
  return quotes.filter((quote) => quote.author.id === authorId)
}

