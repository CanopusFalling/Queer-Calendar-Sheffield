'use client';

export const runtime = 'edge';

import { BsBoxArrowUpRight } from "react-icons/bs";

interface openLinkInNewWindowButtonProps {
    url: string;
}

const OpenLinkInNewWindowButton: React.FC<openLinkInNewWindowButtonProps> = ({ url }) => {
    const openLink = () => {
      window.open(url, "_blank");
    };

    return (
        <button className="flex rounded items-center justify-center border border-black dark:border-white text-black dark:text-white px-4 py-2"
            onClick={openLink}>
            <BsBoxArrowUpRight className="mr-2"/> View Details
        </button>
    );
}

export default OpenLinkInNewWindowButton;