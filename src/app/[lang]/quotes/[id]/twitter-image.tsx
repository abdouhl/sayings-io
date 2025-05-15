import { ImageResponse } from "next/og";
import { getQuoteById } from "@/lib/quotes";
import { rtlLocales } from "@/middleware";

export const runtime = "edge";

export const alt = "Quote Preview for Twitter";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: { lang: string; id: string };
}) {
  try {
    const quote = await getQuoteById(params.id, params.lang);
    const isRtl = rtlLocales.includes(params.lang);

    if (!quote) {
      // Fallback image if quote not found
      return new ImageResponse(
        (
          <div
            style={{
              fontSize: 48,
              background: "linear-gradient(to bottom, #1e293b, #0f172a)",
              color: "white",
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: 48,
            }}
          >
            <div style={{ fontSize: 36, opacity: 0.8, display: "flex" }}>
              Quote not found
            </div>
          </div>
        ),
        { ...size },
      );
    }

    // Generate a gradient color based on the author's name
    const getGradientColor = (name: string) => {
      const colors = [
        "linear-gradient(to right, #4f46e5, #7c3aed)", // indigo to purple
        "linear-gradient(to right, #0ea5e9, #06b6d4)", // sky to cyan
        "linear-gradient(to right, #f59e0b, #d97706)", // amber to yellow
        "linear-gradient(to right, #ef4444, #dc2626)", // red shades
        "linear-gradient(to right, #10b981, #059669)", // emerald shades
      ];

      // Use the sum of character codes to pick a color
      const sum = name
        .split("")
        .reduce((acc, char) => acc + char.charCodeAt(0), 0);
      return colors[sum % colors.length];
    };

    const gradientBackground = getGradientColor(quote.author.name);

    // Calculate font size based on text length - INCREASED SIZES
    const getFontSize = (text: string) => {
      if (text.length > 300) return 36;
      if (text.length > 200) return 42;
      if (text.length > 100) return 48;
      return 56;
    };

    const fontSize = getFontSize(quote.text);

    // Get the base URL from environment or use a default
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL || "https://quotes-website.com";

    // Use author image if available, otherwise use a generated avatar
    const authorImage = quote.author.avatar;
    /*  ? quote.author.image.startsWith("http")
        ? quote.author.image
        : `${baseUrl}${quote.author.image}`
      : `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(quote.author.name)}&backgroundColor=0ea5e9`*/

    return new ImageResponse(
      (
        <div
          style={{
            background: "#0f172a",
            color: "white",
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Background pattern */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              opacity: 0.05,
              display: "flex",
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />

          {/* Decorative top and bottom bars */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 8,
              background: gradientBackground,
              display: "flex",
            }}
          />

          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 8,
              background: gradientBackground,
              display: "flex",
            }}
          />

          {/* Content container with gradient border */}
          <div
            style={{
              margin: 60,
              padding: 50,
              borderRadius: 16,
              background: "#1e293b",
              boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
              width: 1080, // Fixed width (1200 - 60*2)
              height: 510, // Fixed height (630 - 60*2)
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Decorative quote marks */}
            <div
              style={{
                position: "absolute",
                top: 20,
                left: 20,
                fontSize: 120,
                opacity: 0.1,
                fontFamily: "serif",
                color: "#ffffff",
                display: "flex",
              }}
            >
              "
            </div>
            <div
              style={{
                position: "absolute",
                bottom: 20,
                right: 20,
                fontSize: 120,
                opacity: 0.1,
                fontFamily: "serif",
                color: "#ffffff",
                display: "flex",
              }}
            >
              "
            </div>

            {/* Quote text - Centered with flex */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
                width: "100%",
                padding: "0 20px",
              }}
            >
              <div
                style={{
                  fontSize: fontSize,
                  fontStyle: "italic",
                  textAlign: "center",
                  maxWidth: "100%",
                  lineHeight: 1.4,
                  direction: isRtl ? "rtl" : "ltr",
                  display: "flex",
                }}
              >
                "{quote.text}"
              </div>
            </div>

            {/* Author info */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 20,
                marginTop: 30,
              }}
            >
              {/* Author avatar - using author image or generated avatar */}
              <div
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: "50%",
                  background: gradientBackground,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  overflow: "hidden",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                  border: "3px solid rgba(255,255,255,0.1)",
                }}
              >
                <img
                  src={authorImage || "/placeholder.svg"}
                  alt={quote.author.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "flex",
                  }}
                />
              </div>

              {/* Author name */}
              <div
                style={{
                  fontSize: 36,
                  fontWeight: "bold",
                  opacity: 0.9,
                  direction: isRtl ? "rtl" : "ltr",
                  display: "flex",
                }}
              >
                {isRtl ? quote.author.name : `— ${quote.author.name}`}
              </div>
            </div>
          </div>

          {/* Site branding */}
          <div
            style={{
              position: "absolute",
              bottom: 15,
              left: 0,
              right: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
              opacity: 0.7,
            }}
          >
            Sayings • Inspirational Quotes
          </div>
        </div>
      ),
      { ...size },
    );
  } catch (error) {
    console.error("Error generating Twitter image:", error);

    // Return a simple fallback image in case of any error
    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 48,
            background: "linear-gradient(to bottom, #1e293b, #0f172a)",
            color: "white",
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 48,
          }}
        >
          <div style={{ fontSize: 36, opacity: 0.8, display: "flex" }}>
            Error generating image
          </div>
        </div>
      ),
      { ...size },
    );
  }
}
