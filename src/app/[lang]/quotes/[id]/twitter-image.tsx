import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Quote Preview for Twitter";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  // Fetch Google Fonts CSS for both fonts
  const fontCssUrl =
    "https://fonts.googleapis.com/css2?family=Pinyon+Script&family=Delius&display=swap";
  const cssResponse = await fetch(fontCssUrl);
  const cssText = await cssResponse.text();

  // Extract font URLs from the CSS
  const pinyonScriptMatch = cssText.match(
    /font-family: 'Pinyon Script';.*?url\((https:\/\/fonts.gstatic.com\/.+?)\)/,
  );

  const deliusMatch = cssText.match(
    /font-family: 'Delius';.*?url\((https:\/\/fonts.gstatic.com\/.+?)\)/,
  );

  if (!pinyonScriptMatch || !pinyonScriptMatch[1]) {
    throw new Error("Pinyon Script font URL extraction failed.");
  }

  if (!deliusMatch || !deliusMatch[1]) {
    throw new Error("Delius font URL extraction failed.");
  }

  // Fetch both font files
  const pinyonScriptResponse = await fetch(pinyonScriptMatch[1]);
  const deliusResponse = await fetch(deliusMatch[1]);

  if (!pinyonScriptResponse.ok) {
    throw new Error(
      `Failed to fetch Pinyon Script font: ${pinyonScriptResponse.status} ${pinyonScriptResponse.statusText}`,
    );
  }

  if (!deliusResponse.ok) {
    throw new Error(
      `Failed to fetch Delius font: ${deliusResponse.status} ${deliusResponse.statusText}`,
    );
  }

  const pinyonScriptData = await pinyonScriptResponse.arrayBuffer();
  const deliusData = await deliusResponse.arrayBuffer();

  return new ImageResponse(
    (
      <div
        style={{
          background: "#f5f5f5",
          width: 1200,
          height: 630,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 50,
        }}
      >
        <div
          style={{
            fontFamily: "'Pinyon Script', cursive",
            fontSize: 80,
            color: "#333",
            marginBottom: 40,
          }}
        >
          Elegant Heading
        </div>
        <div
          style={{
            fontFamily: "'Delius', sans-serif",
            fontSize: 50,
            color: "#555",
          }}
        >
          Custom Open Graph Image with Two Fonts!
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Pinyon Script",
          data: pinyonScriptData,
          style: "normal",
        },
        {
          name: "Delius",
          data: deliusData,
          style: "normal",
        },
      ],
    },
  );
}
