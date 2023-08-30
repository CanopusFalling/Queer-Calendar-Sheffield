import React from 'react';

import Navbar from './navbar/navbar';

export default function Header() {
  return (
    <header data-testid="site-header">
      <Navbar/>
    </header>
  );
}
