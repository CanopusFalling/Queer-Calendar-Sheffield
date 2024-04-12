"use client";

import React from "react";

import NavLink from "./navLink";

import { NavLinkProps } from "./navLink";
import jsonNavLinks from "./navigationLinks.json";
const navLinks: NavLinkProps[] = jsonNavLinks;

interface AdaptiveLinksProps {
  isNavOpen: Boolean;
}

function AdaptiveLinks({ isNavOpen }: AdaptiveLinksProps) {
  return (
    <div
      data-testid="adaptive-links"
      className={`m-0 pt-0 ${
        isNavOpen ? "flex" : "hidden"
      } flex-col basis-[100%] p-2 lg:flex lg:flex-row lg:basis-auto lg:py-0 lg:pb-0.5`}
      data-te-collapse-item
    >
      {isNavOpen && (
        <hr className="border-0 w-full h-px bg-gradient-to-r from-green-300 via-blue-400 to-purple-500 brightness-75 dark:brightness-100 lg:hidden" />
      )}
      {navLinks.map((link, index) => (
        <NavLink key={index} label={link.label} href={link.href} />
      ))}
    </div>
  );
}

export default AdaptiveLinks;
