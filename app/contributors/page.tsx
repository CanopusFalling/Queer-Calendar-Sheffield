import React from "react";
import Contributors from "./contributors";
import Link from "next/link";

const CreditsPage: React.FC = () => {
  return (
    <main className="mx-auto px-2 text-center max-w-4xl">
      <h1 className="mb-2 text-4xl font-bold">Contributors</h1>
      <hr className="mb-3 border-0 w-full h-px bg-gradient-to-r from-green-300 via-blue-400 to-purple-500 brightness-75 dark:brightness-100" />
      <Contributors />
      <p className="my-2">
        There will be info about how to join the team here sometime in the
        future (I'm very overworked and would love to add more members but
        ironically adding people takes even more work.)
      </p>
      <p className="my-2">
        <Link
          href="/contact"
          className="font-bold text- text-blue-800 dark:text-blue-400 underline visited:text-purple-600 visited:dark:text-purple-400"
        >
          Contact Us
        </Link>{" "}
        if you would like to get involved and I'll add your name to the list.
      </p>
    </main>
  );
};

export default CreditsPage;
