import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Quote Preview for Twitter";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

async function loadGoogleFont (font: string, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=${font}&text=${encodeURIComponent(text)}`
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


export default async function Image() {

  const text = 'Hello world!'
 
  return new ImageResponse(
    (
      <div
        style={{
          backgroundColor: 'white',
          height: '100%',
          width: '100%',
          fontSize: 100,
          fontFamily: 'Geist',
          paddingTop: '100px',
          paddingLeft: '50px',
        }}
      >
        {text}
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Geist',
          data: await loadGoogleFont('Edu+QLD+Beginner', text),
          style: 'normal',
        },
      ],
    },
  );


}
