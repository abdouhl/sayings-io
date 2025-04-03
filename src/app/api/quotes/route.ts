import { type NextRequest, NextResponse } from "next/server"
import { createQuote, getQuoteById, updateQuote, deleteQuote } from "@/lib/quotes"
import { revalidatePath } from "next/cache"

// GET /api/quotes/:id
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const lang = request.nextUrl.searchParams.get("lang") || "en"

    const quote = await getQuoteById(id, lang)

    if (!quote) {
      return NextResponse.json({ error: "Quote not found" }, { status: 404 })
    }

    return NextResponse.json(quote)
  } catch (error) {
    console.error("Error fetching quote:", error)
    return NextResponse.json({ error: "Failed to fetch quote" }, { status: 500 })
  }
}

// POST /api/quotes
export async function POST(request: NextRequest) {
  try {
    const { text, authorId, lang = "en" } = await request.json()

    if (!text || !authorId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const quote = await createQuote(text, Number.parseInt(authorId), lang)

    // Revalidate the quotes and author pages
    revalidatePath(`/[lang]`)
    revalidatePath(`/[lang]/authors/${authorId}`)

    return NextResponse.json(quote, { status: 201 })
  } catch (error) {
    console.error("Error creating quote:", error)
    return NextResponse.json({ error: "Failed to create quote" }, { status: 500 })
  }
}

// PUT /api/quotes/:id
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const { text, lang = "en" } = await request.json()

    if (!text) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const quote = await updateQuote(id, text, lang)

    if (!quote) {
      return NextResponse.json({ error: "Quote not found" }, { status: 404 })
    }

    // Revalidate the quote page
    revalidatePath(`/[lang]/quotes/${id}`)
    revalidatePath(`/[lang]/authors/${quote.author.id}`)

    return NextResponse.json(quote)
  } catch (error) {
    console.error("Error updating quote:", error)
    return NextResponse.json({ error: "Failed to update quote" }, { status: 500 })
  }
}

// DELETE /api/quotes/:id
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    // Get the quote first to know the author ID for revalidation
    const quote = await getQuoteById(id, "en")
    const authorId = quote?.author.id

    const success = await deleteQuote(id)

    if (!success) {
      return NextResponse.json({ error: "Quote not found" }, { status: 404 })
    }

    // Revalidate the quotes and author pages
    revalidatePath(`/[lang]`)
    if (authorId) {
      revalidatePath(`/[lang]/authors/${authorId}`)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting quote:", error)
    return NextResponse.json({ error: "Failed to delete quote" }, { status: 500 })
  }
}