import Link from "next/link";
import React from "react";

function SiteLogo() {
  return (
    <Link
      className="flex p-3 pt-2 text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-blue-400 to-purple-500 brightness-80 dark:brightness-110"
      href="/"
      aria-label="Homepage"
    >
      QCS
    </Link>
  );
}

export default SiteLogo;
