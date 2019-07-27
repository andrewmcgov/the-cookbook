import * as React from 'react';
import { FiMenu } from 'react-icons/fi';
import { IconContext } from 'react-icons';

import Nav from '../Nav';
import MobileNav from '../MobileNav';
import { Link } from 'react-router-dom';

import { INavItem } from '../types';

const NavItems: INavItem[] = [
  { name: 'Home', url: '/' },
  { name: 'Account', url: '/account' },
  { name: 'Add Recipe', url: '/recipes/new' }
];

const Header = () => {
  const [mobileNavOpen, setMobileNavOpen] = React.useState(false);
  return (
    <>
      <header className="header">
        <Link className="link--no-underline" to="/">
          <h1 className="header__title">The Cookbook 👨🏻‍🍳👩🏻‍🍳</h1>
        </Link>
        <Nav items={NavItems} />
        <button
          className="mobile-nav__trigger"
          onClick={() => setMobileNavOpen(true)}
        >
          <IconContext.Provider value={{ size: '30' }}>
            <FiMenu />
          </IconContext.Provider>
        </button>
      </header>
      <MobileNav
        isOpen={mobileNavOpen}
        closeFn={setMobileNavOpen}
        items={NavItems}
      />
    </>
  );
};

export default Header;
