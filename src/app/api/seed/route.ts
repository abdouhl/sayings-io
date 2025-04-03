import { type NextRequest, NextResponse } from "next/server"
import { seedDatabase } from "@/lib/seed"
import { revalidatePath } from "next/cache"

// POST /api/seed
export async function POST(request: NextRequest) {
  try {
    console.log("Seed API route called")
    const result = await seedDatabase()

    if (result.success) {
      // Revalidate all pages
      revalidatePath("/[lang]")
      revalidatePath("/[lang]/authors")

      return NextResponse.json(result)
    } else {
      console.error("Seed error:", result.error)
      return NextResponse.json({ error: result.error }, { status: 500 })
    }
  } catch (error) {
    console.error("Error in seed API route:", error)
    return NextResponse.json(
      {
        error: "Failed to seed database: " + (error instanceof Error ? error.message : String(error)),
      },
      { status: 500 },
    )
  }
}

