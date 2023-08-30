import React from 'react';
import Contributors from './contributors';

const CreditsPage: React.FC = () => {
  return (
    <main className="mb-32 m-8 text-center">
      <h2 className="mb-12 text-3xl font-bold">
        Project Contributors
      </h2>
      <Contributors />
    </main>
  );
};

export default CreditsPage;
