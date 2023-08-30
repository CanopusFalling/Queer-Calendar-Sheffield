'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const NavLink = dynamic(() => import('./navLink'), {
    ssr: false // This will ensure the component is only loaded on the client-side
});

import { NavLinkProps } from './navLink'
import jsonNavLinks from './navigationLinks.json'
const navLinks: NavLinkProps[] = jsonNavLinks;

interface AdaptiveLinksProps {
    isNavOpen: Boolean;
}

function AdaptiveLinks({ isNavOpen }: AdaptiveLinksProps) {
    return (
        <div
            data-testid="adaptive-links"
            className={`${isNavOpen ? 'flex' : 'hidden'
                } mt-2 lg:flex flex-grow basis-[100%] items-center lg:mt-0 lg:basis-auto`}
            data-te-collapse-item
        >
            <div
                className="flex-grow mt-4 list-style-none flex flex-col pl-0 lg:mt-0 lg:ml-4 lg:flex-row"
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