import { ImageResponse } from "next/og"
import type { NextRequest } from "next/server"

export const runtime = "edge"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    // Get the title from query params or use a default
    const title = searchParams.get("title") || "Inspirational Quotes"

    // Font configuration
    const fontData = await fetch(new URL("../../../../assets/inter-medium.woff", import.meta.url)).then((res) =>
      res.arrayBuffer(),
    )

    return new ImageResponse(
      <div
        style={{
          fontSize: 64,
          background: "linear-gradient(to bottom, #1e293b, #0f172a)",
          color: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 48,
          position: "relative",
        }}
      >
        {/* Decorative elements */}
        <div
          style={{
            position: "absolute",
            top: 60,
            left: 60,
            fontSize: 120,
            opacity: 0.2,
            display: "flex",
          }}
        >
          "
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 60,
            right: 60,
            fontSize: 120,
            opacity: 0.2,
            display: "flex",
          }}
        >
          "
        </div>

        {/* Main title */}
        <div
          style={{
            fontSize: 72,
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: 20,
            display: "flex",
          }}
        >
          {title}
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 36,
            opacity: 0.8,
            textAlign: "center",
            display: "flex",
          }}
        >
          Discover wisdom from the world's greatest minds
        </div>

        {/* Site branding */}
        <div
          style={{
            position: "absolute",
            bottom: 30,
            left: 0,
            right: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 24,
            opacity: 0.6,
          }}
        >
          Sayings • Inspirational Quotes
        </div>
      </div>,
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Inter",
            data: fontData,
            style: "normal",
            weight: 500,
          },
        ],
      },
    )
  } catch (error) {
    console.error("Error generating OG image:", error)
    return new Response("Error generating image", { status: 500 })
  }
}

