'use client';

export const runtime = 'edge';

import { BsBoxArrowUpRight } from "react-icons/bs";

interface openLinkInNewWindowButtonProps {
    url: string;
    text: string;
}

const OpenLinkInNewWindowButton: React.FC<openLinkInNewWindowButtonProps> = ({ url, text }) => {
    const openLink = () => {
      window.open(url, "_blank");
    };

    return (
        <button className="flex rounded items-center justify-center border border-black dark:border-white text-black dark:text-white px-4 py-2 text-xs font-medium uppercase"
            onClick={openLink}>
            <BsBoxArrowUpRight className="mr-2"/> {text}
        </button>
    );
}

export default OpenLinkInNewWindowButton;