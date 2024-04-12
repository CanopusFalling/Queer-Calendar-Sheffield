import type { MDXComponents } from "mdx/types";
import Link from "next/link";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold mb-4">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-bold mb-3">{children}</h2>
    ),
    a: ({ href, children }) => (
      <Link
        href={href || ""}
        className="text-blue-800 dark:text-blue-400 underline visited:text-purple-600 visited:dark:text-purple-400"
      >
        {children}
      </Link>
    ),
    ul: ({ children }) => <ul className="list-disc pl-5 mb-4">{children}</ul>,
    li: ({ children }) => <li className="mb-1">{children}</li>,
    p: ({ children }) => <p className="mb-4">{children}</p>,
    hr: ({ children }) => (
      <hr className="mb-4 border-0 w-full h-px bg-gradient-to-r from-green-300 via-blue-400 to-purple-500 brightness-75 dark:brightness-100">
        {children}
      </hr>
    ),
    ...components,
  };
}
