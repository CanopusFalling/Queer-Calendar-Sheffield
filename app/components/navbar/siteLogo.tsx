import React from "react";

function SiteLogo() {
    return (
        <div data-testid='site-logo' className="ml-2">
            <a className="flex w-full flex-nowrap text-xl text-neutral-800 dark:text-neutral-200" href="/">
                <img data-testid="logo-image" src="/favicon.ico" alt="Logo" className="h-7 w-7 mr-1"/>
                Queer Calendar Sheffield
            </a>
        </div>
    );
}

export default SiteLogo;