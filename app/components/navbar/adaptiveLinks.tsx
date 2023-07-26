'use client';

import React from 'react';

import NavLink, { NavLinkProps } from './navLink'
import jsonNavLinks from './navigationLinks.json'
const navLinks: NavLinkProps[] = jsonNavLinks;

interface AdaptiveLinksProps {
    isNavOpen: Boolean;
}

function AdaptiveLinks({isNavOpen}: AdaptiveLinksProps) {
    return (
        <div
          className={`${isNavOpen ? 'flex' : 'hidden'
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
    );
}

export default AdaptiveLinks;