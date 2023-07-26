import React from "react";

function SiteLogo() {
    return (
        <div className="ml-2">
            <a className="flex w-full flex-nowrap text-xl text-neutral-800 dark:text-neutral-200" href="/">
                <img src="favicon.ico" alt="Logo" className="h-7 w-7 mr-1" />
                Queer Calendar Sheffield
            </a>
        </div>
    );
}

export default SiteLogo;