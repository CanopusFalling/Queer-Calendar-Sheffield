// Image metadata
export const alt = "Hello";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/svg";

// Image generation
export default async function Image() {
  const svgContent = `
    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
      <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
    </svg>
  `;

  return new Response(svgContent, {
    headers: {
      "Content-Type": "image/svg+xml",
    },
  });
}
