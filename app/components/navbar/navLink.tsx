'use client';

import React from "react";

export interface NavLinkProps {
    label: string;
    href: string;
}

function NavLink({ label, href }: NavLinkProps) {
    function removeAnchors (path: string){
        return path.split('#')[0];
    }

    const isActive = removeAnchors(window.location.pathname) === removeAnchors(href);

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

export default NavLink;