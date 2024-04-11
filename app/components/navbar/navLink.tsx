"use client";

import React from "react";

import { usePathname } from "next/navigation";
import Link from "next/link";

export interface NavLinkProps {
  label: string;
  href: string;
}

function NavLink({ label, href }: NavLinkProps) {
  function removeAnchors(path: string) {
    return path.split("#")[0];
  }

  const isActive = usePathname() === removeAnchors(href);

  return (
    <Link
      className={`text-xl transition duration-150 ease-in-out hover:brightness-200 dark:hover:brightness-50 p-2 ${
        isActive ? " brightness-50" : ""
      }`}
      href={href}
      data-te-nav-link-ref
    >
      {label}
    </Link>
  );
}

export default NavLink;
