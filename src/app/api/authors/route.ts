import { type NextRequest, NextResponse } from "next/server"
import { createAuthor, getAuthorById, updateAuthor, deleteAuthor } from "@/lib/authors"
import { revalidatePath } from "next/cache"

// GET /api/authors/:id
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const lang = request.nextUrl.searchParams.get("lang") || "en"

    const author = await getAuthorById(id, lang)

    if (!author) {
      return NextResponse.json({ error: "Author not found" }, { status: 404 })
    }

    return NextResponse.json(author)
  } catch (error) {
    console.error("Error fetching author:", error)
    return NextResponse.json({ error: "Failed to fetch author" }, { status: 500 })
  }
}

// POST /api/authors
export async function POST(request: NextRequest) {
  try {
    const { name, avatar } = await request.json()

    if (!name || !avatar) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const author = await createAuthor(name, avatar)

    // Revalidate the authors page
    revalidatePath(`/[lang]/authors`)

    return NextResponse.json(author, { status: 201 })
  } catch (error) {
    console.error("Error creating author:", error)
    return NextResponse.json({ error: "Failed to create author" }, { status: 500 })
  }
}

// PUT /api/authors/:id
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const { name, avatar } = await request.json()

    if (!name || !avatar) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const author = await updateAuthor(id, name, avatar)

    if (!author) {
      return NextResponse.json({ error: "Author not found" }, { status: 404 })
    }

    // Revalidate the author pages
    revalidatePath(`/[lang]/authors`)
    revalidatePath(`/[lang]/authors/${id}`)

    return NextResponse.json(author)
  } catch (error) {
    console.error("Error updating author:", error)
    return NextResponse.json({ error: "Failed to update author" }, { status: 500 })
  }
}

// DELETE /api/authors/:id
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    const success = await deleteAuthor(id)

    if (!success) {
      return NextResponse.json({ error: "Author not found" }, { status: 404 })
    }

    // Revalidate the authors pages
    revalidatePath(`/[lang]/authors`)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting author:", error)
    return NextResponse.json({ error: "Failed to delete author" }, { status: 500 })
  }
}

