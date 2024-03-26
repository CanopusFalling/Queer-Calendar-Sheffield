import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";

interface HamburgerButtonProps {
  onClick: () => void;
}

function HamburgerButton({ onClick }: HamburgerButtonProps) {
  return (
    <button
      data-testid="hamburger-icon"
      className="block border-0 bg-transparent px-2 text-neutral-500 dark:text-neutral-200 lg:hidden"
      type="button"
      onClick={onClick} // Add onClick handler
      aria-label="Toggle navigation"
    >
      <GiHamburgerMenu title="Toggle navigation" />
    </button>
  );
}

export default HamburgerButton;
