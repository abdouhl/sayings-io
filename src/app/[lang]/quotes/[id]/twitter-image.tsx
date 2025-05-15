import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Quote Preview for Twitter";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  // Fetch Google Fonts CSS
  // https://fonts.googleapis.com/css2?family=Delius&family=Mochiy+Pop+One&family=Pinyon+Script&display=swap
  const fontCssUrl =
    "https://fonts.googleapis.com/css2?family=Pinyon+Script&display=swap";
  const cssResponse = await fetch(fontCssUrl);
  const cssText = await cssResponse.text();

  // Extract font URLs from the CSS
  const fontUrlMatch = cssText.match(
    /url\((https:\/\/fonts.gstatic.com\/.+?)\)/,
  );

  if (!fontUrlMatch || !fontUrlMatch[1]) {
    throw new Error("Font URL extraction failed.");
  }

  const fontResponse = await fetch(fontUrlMatch[1]);

  if (!fontResponse.ok) {
    throw new Error(
      `Failed to fetch font file: ${fontResponse.status} ${fontResponse.statusText}`,
    );
  }

  const fontData = await fontResponse.arrayBuffer();

  return new ImageResponse(
    (
      <div
        style={{
          fontFamily: "'Delius', sans-serif",
          background: "#f5f5f5",
          width: 1200,
          height: 630,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: 60,
          padding: 50,
        }}
      >
        Custom Open Graph Image!
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Delius",
          data: fontData,
          style: "normal",
        },
      ],
    },
  );
}
