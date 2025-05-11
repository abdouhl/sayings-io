import { ImageResponse } from "next/og";
import { getQuoteById } from "@/lib/quotes";
import { rtlLocales } from "@/middleware";

export const runtime = "edge";

export const alt = "Quote Preview for Twitter";
export const size = {
  width: 1200,
  height: 600, // Twitter prefers 2:1 aspect ratio
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
              background: "linear-gradient(135deg, #1e293b, #0f172a)",
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
        "linear-gradient(135deg, #4f46e5, #7c3aed)", // indigo to purple
        "linear-gradient(135deg, #0ea5e9, #06b6d4)", // sky to cyan
        "linear-gradient(135deg, #f59e0b, #d97706)", // amber to yellow
        "linear-gradient(135deg, #ef4444, #dc2626)", // red shades
        "linear-gradient(135deg, #10b981, #059669)", // emerald shades
      ];

      // Use the sum of character codes to pick a color
      const sum = name
        .split("")
        .reduce((acc, char) => acc + char.charCodeAt(0), 0);
      return colors[sum % colors.length];
    };

    const gradientBackground = getGradientColor(quote.author.name);

    // Calculate font size based on text length - Optimized for Twitter
    const getFontSize = (text: string) => {
      if (text.length > 300) return 32;
      if (text.length > 200) return 36;
      if (text.length > 100) return 42;
      return 48;
    };

    const fontSize = getFontSize(quote.text);

    // Get the base URL from environment or use a default
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL || "https://quotes-website.com";

    return new ImageResponse(
      (
        <div
          style={{
            background: "linear-gradient(135deg, #0f172a, #1e293b)",
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

          {/* Decorative elements */}
          <div
            style={{
              position: "absolute",
              top: "-100px",
              left: "-100px",
              width: "300px",
              height: "300px",
              borderRadius: "50%",
              background: gradientBackground,
              opacity: 0.2,
              filter: "blur(40px)",
              display: "flex",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "-50px",
              right: "-50px",
              width: "250px",
              height: "250px",
              borderRadius: "50%",
              background: gradientBackground,
              opacity: 0.15,
              filter: "blur(40px)",
              display: "flex",
            }}
          />

          {/* Website logo/branding at top */}
          <div
            style={{
              position: "absolute",
              top: "30px",
              left: "30px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "8px",
                background: gradientBackground,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "24px",
                fontWeight: "bold",
              }}
            >
              Q
            </div>
            <div
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                background: "linear-gradient(to right, #fff, #cbd5e1)",
                backgroundClip: "text",
                color: "transparent",
                display: "flex",
              }}
            >
              Sayings
            </div>
          </div>

          {/* Large decorative quote mark */}
          <div
            style={{
              position: "absolute",
              top: "60px",
              left: "60px",
              fontSize: "180px",
              fontFamily: "serif",
              opacity: "0.1",
              color: "#fff",
              display: "flex",
            }}
          >
            "
          </div>

          {/* Content container - Wider for Twitter */}
          <div
            style={{
              margin: "0 60px",
              padding: "40px",
              borderRadius: "24px",
              background: "rgba(30, 41, 59, 0.7)",
              backdropFilter: "blur(10px)",
              boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
              width: "calc(100% - 120px)",
              maxWidth: "1000px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            {/* Quote text */}
            <div
              style={{
                fontSize: fontSize,
                fontStyle: "italic",
                textAlign: "center",
                maxWidth: "100%",
                lineHeight: 1.4,
                direction: isRtl ? "rtl" : "ltr",
                display: "flex",
                marginBottom: "30px",
                background: "linear-gradient(to bottom, #fff, #94a3b8)",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              "{quote.text}"
            </div>

            {/* Author info */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
              }}
            >
              {/* Author avatar */}
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  background: gradientBackground,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  overflow: "hidden",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                  border: "3px solid rgba(255,255,255,0.1)",
                  fontSize: "24px",
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                {quote.author.name.charAt(0)}
              </div>

              {/* Author name */}
              <div
                style={{
                  fontSize: "28px",
                  fontWeight: "bold",
                  opacity: 0.9,
                  direction: isRtl ? "rtl" : "ltr",
                  display: "flex",
                  background: "linear-gradient(to right, #fff, #94a3b8)",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                {isRtl ? quote.author.name : `— ${quote.author.name}`}
              </div>
            </div>
          </div>

          {/* Tags display */}
          {quote.tags && quote.tags.length > 0 && (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "8px",
                maxWidth: "80%",
                marginTop: "20px",
              }}
            >
              {quote.tags.slice(0, 5).map((tag) => (
                <div
                  key={tag}
                  style={{
                    padding: "6px 12px",
                    borderRadius: "9999px",
                    background: "rgba(255,255,255,0.1)",
                    fontSize: "14px",
                    color: "#e2e8f0",
                    display: "flex",
                  }}
                >
                  #{tag}
                </div>
              ))}
            </div>
          )}

          {/* Site URL at bottom */}
          <div
            style={{
              position: "absolute",
              bottom: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "16px",
              opacity: 0.7,
              color: "#e2e8f0",
            }}
          >
            {baseUrl.replace(/^https?:\/\//, "")}
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
