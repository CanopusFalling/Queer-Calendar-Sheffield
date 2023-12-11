import { ImageResponse } from "next/og";

// Image metadata
export const alt = "Hello";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function Image() {
  return new ImageResponse(
    <div>hello</div>,
    // ImageResponse options
    {
      ...size,
    },
  );
}
