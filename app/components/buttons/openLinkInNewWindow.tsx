import Link from "next/link";

import { BsBoxArrowUpRight } from "react-icons/bs";

interface openLinkInNewWindowButtonProps {
  url: string;
  text: string;
}

const OpenLinkInNewWindowButton: React.FC<openLinkInNewWindowButtonProps> = ({
  url,
  text,
}) => {
  const openLink = () => {
    window.open(url, "_blank");
  };

  return (
    <Link
      href={url}
      data-testid={`open-new-window-${url}`}
      className="flex rounded items-center justify-center border border-black dark:border-white text-black dark:text-white px-4 py-2 text-xs font-medium uppercase"
      target="_blank"
    >
      <BsBoxArrowUpRight className="mr-2" /> {text}
    </Link>
  );
};

export default OpenLinkInNewWindowButton;
