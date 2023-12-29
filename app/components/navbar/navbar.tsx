"use client";

import React, { useState } from "react";

import SiteLogo from "./siteLogo";

import HamburgerButton from "./hamburgerButton";
import NavLink, { NavLinkProps } from "./navLink";
import navLinks from "./navigationLinks.json";
import AdaptiveLinks from "./adaptiveLinks";

function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  function handleToggleNav() {
    setIsNavOpen(!isNavOpen);
  }

  return (
    <nav className="relative flex w-full flex-nowrap items-center justify-between bg-[#FBFBFB] py-2 hover:text-neutral-700 focus:text-neutral-700 dark:bg-neutral-700 lg:flex-wrap lg:justify-start lg:py-4">
      <div className="flex w-full flex-wrap items-center justify-between px-3">
        <SiteLogo />
        <HamburgerButton onClick={handleToggleNav} />
        <AdaptiveLinks isNavOpen={isNavOpen} />
      </div>
    </nav>
  );
}

export default Navbar;
