import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import Nav from '../Nav';
import MobileNav from '../MobileNav';

const Header = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  return (
    <>
      <header className="header">
        <h1 className="header__title">The Cookbook 👨🏻‍🍳👩🏻‍🍳</h1>
        <Nav />
        <button
          className="mobile-nav__trigger"
          onClick={() => setMobileNavOpen(true)}
        >
          <FontAwesomeIcon icon={faBars} size={'lg'} />
        </button>
      </header>
      <MobileNav isOpen={mobileNavOpen} closeFn={setMobileNavOpen} />
    </>
  );
};

export default Header;
