import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold mb-4">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-bold mb-3">{children}</h2>
    ),
    a: ({ href, children }) => (
      <a
        href={href}
        className="text-blue-800 dark:text-blue-400 hover:underline visited:text-purple-600 visited:dark:text-purple-400"
      >
        {children}
      </a>
    ),
    ul: ({ children }) => <ul className="list-disc pl-5 mb-4">{children}</ul>,
    li: ({ children }) => <li className="mb-1">{children}</li>,
    p: ({ children }) => <p className="mb-4">{children}</p>,
    ...components,
  };
}
