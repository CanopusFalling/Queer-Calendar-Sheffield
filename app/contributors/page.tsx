import React from "react";
import Contributors from "./contributors";

const CreditsPage: React.FC = () => {
  return (
    <main className="m-8 text-center">
      <h2 className="mb-6 text-3xl font-bold bg-white dark:bg-neutral-700 p-4 rounded-xl">
        Project Contributors
      </h2>
      <Contributors />
    </main>
  );
};

export default CreditsPage;
