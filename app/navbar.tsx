'use client';

import React, { useState } from 'react';

interface HamburgerButtonProps {
  onClick: () => void;
}

interface NavLinkProps {
  label: string;
  href: string;
}

const navLinks: NavLinkProps[] = [
  { label: 'Home', href: '/'},
  { label: 'Contributors', href: '/contributors'}
];

function Logo() {
  return (
    <div className="ml-2">
      <a className="flex w-full flex-nowrap text-xl text-neutral-800 dark:text-neutral-200" href="/#">
        <img src="favicon.ico" alt="Logo" className="h-7 w-7 mr-1" />
        Queer Calendar Sheffield
      </a>
    </div>
  );
}


function NavLink({ label, href}: NavLinkProps) {
  const isActive = window.location.pathname === href;

  return (
    <div className="mb-4 pl-2 lg:mb-0 lg:pl-0 lg:pr-1">
      <a
        className={`p-0  transition duration-200 hover:text-neutral-700 hover:ease-in-out focus:text-neutral-700 disabled:text-black/30 motion-reduce:transition-none  dark:hover:text-neutral-400 dark:focus:text-neutral-400 lg:px-2 ${isActive ? 'text-black/90 dark:text-neutral-400' : 'text-neutral-500 dark:text-neutral-200'}`}
        href={href}
        data-te-nav-link-ref
      >
        {label}
      </a>
    </div>
  );
}

function HamburgerSvg() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-7 w-7">
      <path
        fillRule="evenodd"
        d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
        clipRule="evenodd" />
    </svg>
  )
}

function HamburgerButton({ onClick }: HamburgerButtonProps) {
  return (
    <button
      className="block border-0 bg-transparent px-2 text-neutral-500 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200 lg:hidden"
      type="button"
      onClick={onClick} // Add onClick handler
      aria-label="Toggle navigation"
    >
      <span className="[&>svg]:w-7">
        <HamburgerSvg />
      </span>
    </button>
  );
}


export default function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  function handleToggleNav() {
    setIsNavOpen(!isNavOpen);
  }

  return (
    <nav className="relative flex w-full flex-nowrap items-center justify-between bg-[#FBFBFB] py-2 text-neutral-500 shadow-lg hover:text-neutral-700 focus:text-neutral-700 dark:bg-neutral-600 lg:flex-wrap lg:justify-start lg:py-4">
      <div className="flex w-full flex-wrap items-center justify-between px-3">
        <Logo />
        <HamburgerButton onClick={handleToggleNav} />
        <div
          className={`${
            isNavOpen ? 'flex' : 'hidden'
          } mt-2 lg:flex flex-grow basis-[100%] items-center lg:mt-0 lg:basis-auto`}
          id="navbarSupportedContent3"
          data-te-collapse-item
        >
          <div
            className="mt-4 list-style-none mr-auto flex flex-col pl-0 lg:mt-0 lg:ml-4 lg: lg:flex-row"
          >
            {navLinks.map((link, index) => (
              <NavLink
                key={index}
                label={link.label}
                href={link.href}
              />
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}