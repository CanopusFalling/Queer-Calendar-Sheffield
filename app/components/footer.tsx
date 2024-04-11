import React from "react";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-green-300 via-blue-400 to-purple-500">
      <div className="flex flex-col flex-wrap justify-center gap-4 sm:flex-row p-4 underline text-center bg-white/[0.8] dark:bg-black/[0.8]">
        <Link href="/contact">Contact Us</Link>
        <Link href="/contact">Add An Event</Link>
        <Link href="https://github.com/CanopusFalling/Queer-Calendar-Sheffield">
          View Project on GitHub
        </Link>
        <Link href="/contributors">Project Contributors</Link>
        <Link href="/accessibility">Accessibility Statement</Link>
      </div>
    </footer>
  );
}
