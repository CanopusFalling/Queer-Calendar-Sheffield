import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
};

const withMDX = createMDX(); //Placeholder for adding plugins later.

export default withMDX(nextConfig);

// Dev Platform Setup For Accessing D1 Bindings in Local Development.
import { setupDevPlatform } from "@cloudflare/next-on-pages/next-dev";
if (process.env.NODE_ENV === "development") {
  await setupDevPlatform;
}
