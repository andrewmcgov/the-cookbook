import React from 'react';

import Nav from '../Nav';

const Header = () => (
  <header className="header">
    <h1>The Cookbook 👨🏻‍🍳👩🏻‍🍳</h1>
    <Nav />
    <button className="mobile-nav__trigger">menu</button>
  </header>
);

export default Header;
