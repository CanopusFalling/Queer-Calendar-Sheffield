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
    <nav className="bg-white dark:bg-black flex w-full flex-wrap items-center justify-between lg:justify-normal">
      <SiteLogo />
      <HamburgerButton onClick={handleToggleNav} />
      <AdaptiveLinks isNavOpen={isNavOpen} />
    </nav>
  );
}

export default Navbar;
