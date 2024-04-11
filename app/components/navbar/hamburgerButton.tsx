import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IconContext } from "react-icons";

interface HamburgerButtonProps {
  onClick: () => void;
}

function HamburgerButton({ onClick }: HamburgerButtonProps) {
  return (
    <button
      data-testid="hamburger-icon"
      className="block border-0 px-4 text-neutral-500 dark:text-neutral-200 lg:hidden"
      type="button"
      onClick={onClick} // Add onClick handler
      aria-label="Toggle navigation"
    >
      <GiHamburgerMenu
        title="Toggle navigation"
        className="blue-400 text-4xl"
      />
    </button>
  );
}

export default HamburgerButton;
