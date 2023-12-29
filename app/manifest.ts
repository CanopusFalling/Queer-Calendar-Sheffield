import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Queer Calendar Sheffield",
    short_name: "QCS",
    description: "A place to find queer and LGBTQ+ events in Sheffield",
    start_url: "/",
    display: "standalone",
    background_color: "#000",
    theme_color: "#000",
    icons: [
      {
        src: "/icon/maskable-48.png",
        sizes: "48x48",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon/maskable-72.png",
        sizes: "72x72",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon/maskable-96.png",
        sizes: "96x96",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon/maskable-128.png",
        sizes: "128x128",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon/maskable-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon/maskable-384.png",
        sizes: "384x384",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon/maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon/1204.webp",
        sizes: "1204x1204",
        type: "image/webp",
        purpose: "any",
      },
      {
        src: "/icon/512.webp",
        sizes: "512x512",
        type: "image/webp",
        purpose: "any",
      },
      {
        src: "/icon/256.webp",
        sizes: "256x256",
        type: "image/webp",
        purpose: "any",
      },
      {
        src: "/icon/128.webp",
        sizes: "128x128",
        type: "image/webp",
        purpose: "any",
      },
      {
        src: "/icon/64.webp",
        sizes: "64x64",
        type: "image/webp",
        purpose: "any",
      },
      {
        src: "/icon/32.webp",
        sizes: "32x32",
        type: "image/webp",
        purpose: "any",
      },
    ],
    shortcuts: [
      {
        name: "Events",
        url: "/",
        description: "Browse LGBTQ+ events in Sheffield",
      },
      {
        name: "Contributors",
        url: "/contributors",
        description: "A list of our contributors",
      },
    ],
  };
}
