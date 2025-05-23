import { ImageResponse } from "next/og";
import { getQuoteById } from "@/lib/quotes";
import { rtlLocales } from "@/middleware";

export const runtime = "edge";

export const alt = "Quote Preview for Pinterest";
export const size = {
  width: 1000,
  height: 1500, // Pinterest prefers taller images (2:3 aspect ratio)
};

export const contentType = "image/png";

async function loadGoogleFont (font: string) {
  const url = `https://fonts.googleapis.com/css2?family=${font}`
  const css = await (await fetch(url)).text()
  const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/)
 
  if (resource) {
    const response = await fetch(resource[1])
    if (response.status == 200) {
      return await response.arrayBuffer()
    }
  }
 
  throw new Error('failed to load font data')
}


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

    // Calculate font size based on text length - INCREASED SIZES
    const getFontSize = (text: string) => {
      if (text.length > 300) return 48;
      if (text.length > 280) return 52;
      if (text.length > 260) return 54;
      if (text.length > 240) return 56;
      if (text.length > 220) return 58;
      if (text.length > 200) return 60;
      if (text.length > 180) return 62;
      if (text.length > 160) return 64;
      if (text.length > 140) return 66;
      if (text.length > 120) return 68;
      if (text.length > 100) return 72;
      if (text.length > 80) return 74;
      return 76;
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

          {/* Decorative elements */}
          <div
            style={{
              position: "absolute",
              top: -100,
              left: -100,
              width: 300,
              height: 300,
              borderRadius: "50%",
              background: gradientBackground,
              opacity: 0.15,
              filter: "blur(40px)",
              display: "flex",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 100,
              right: 50,
              width: 250,
              height: 250,
              borderRadius: "50%",
              background: gradientBackground,
              opacity: 0.1,
              filter: "blur(40px)",
              display: "flex",
            }}
          />

          {/* Content container */}
          <div
            style={{
              margin: 60,
              padding: 60,
              borderRadius: 24,
              background: "#1e293b",
              boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
              width: 880, // Fixed width (1000 - 60*2)
              height: 1380, // Fixed height (1500 - 60*2)
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            {/* Decorative quote marks */}
            <div
              style={{
                position: "absolute",
                top: 30,
                left: 30,
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
                bottom: 30,
                right: 30,
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
                  fontFamily: 'quote',
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
                flexDirection: "column",
                alignItems: "center",
                gap: 20,
                marginTop: 40,
                marginBottom: 40,
              }}
            >
              {/* Author avatar - using author image or generated avatar */}
              <div
                style={{
                  width: 180,
                  height: 180,
                  borderRadius: "50%",
                  background: gradientBackground,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  overflow: "hidden",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                  border: "4px solid rgba(255,255,255,0.1)",
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
                  fontSize: 42,
                  fontFamily: 'author',
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
              bottom: 20,
              left: 0,
              right: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 24,
              opacity: 0.7,
            }}
          >
            Sayings • Inspirational Quotes
          </div>
        </div>
      ),
      {
      width: 1000,
      height: 1500,
      fonts: [
        {
          name: 'quote',
          data: await loadGoogleFont('Special+Elite'),
          style: 'normal',
        },{
          name: 'author',
          data: await loadGoogleFont('Charm:wght@700'),
          style: 'normal',
        },
      ],
    },
    );
  } catch (error) {
    console.error("Error generating OpenGraph image:", error);

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
