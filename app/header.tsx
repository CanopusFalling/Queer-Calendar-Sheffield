import React from 'react';

export const runtime = 'edge';

import Navbar from './navbar';

export default function Header() {
  return (
    <header>
      <Navbar/>
    </header>
  );
}
