import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "edge";

// Image metadata
export const alt = "Queer Calendar Sheffield";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/svg";

export default async function Image() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "black",
          color: "white",
          padding: "20px",
          boxSizing: "border-box",
        }}
      >
        {/* Event Title */}
        <div
          style={{
            fontSize: 64,
            fontWeight: "bold",
            maxWidth: "80%",
            marginBottom: "20px",
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          Event Title
        </div>

        {/* Event Description */}
        <div
          style={{
            fontSize: 32,
            maxWidth: "80%",
            marginBottom: "20px",
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          Event Description that may be truncated when too long.
        </div>

        {/* QCS Bottom Bar */}
        <div className="flex flex-row flex-right">
          <div
            className="flex"
            style={{
              fontSize: 32,
              textAlign: "right",
              marginTop: "auto",
            }}
          >
            Queer Calendar Sheffield
          </div>
        </div>
      </div>
    ),
    // ImageResponse options
    {
      ...size,
    },
  );
}
