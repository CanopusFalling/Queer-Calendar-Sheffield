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
    <nav className="relative flex w-full flex-nowrap items-center justify-between bg-white hover:text-neutral-700 focus:text-neutral-700 dark:bg-black lg:flex-wrap lg:justify-start">
      <div className="flex w-full flex-wrap items-center justify-between">
        <SiteLogo />
        <HamburgerButton onClick={handleToggleNav} />
        <AdaptiveLinks isNavOpen={isNavOpen} />
      </div>
    </nav>
  );
}

export default Navbar;
