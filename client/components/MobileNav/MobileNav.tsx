import * as React from 'react';
import { FiX } from 'react-icons/fi';
import { IconContext } from 'react-icons';
import { Link } from 'react-router-dom';

import { INavItem } from '../types';

type Props = {
  isOpen: boolean;
  closeFn(value: boolean): void;
  items: INavItem[];
};

const MobileNav = ({ isOpen, closeFn, items }: Props) => {
  return (
    <div className={`mobile-nav__wrapper ${isOpen && 'mobile-nav--open'}`}>
      <div className="mobile-nav__header">
        <h3 className="mobile-nav__title">Menu</h3>
        <button
          className="mobile-nav__close-button"
          onClick={() => closeFn(false)}
        >
          <IconContext.Provider
            value={{ size: '30', className: 'mobile-nav_close-icon' }}
          >
            <FiX />
          </IconContext.Provider>
        </button>
      </div>
      <ul className="mobile-nav">
        {items.map((item, index) => {
          return (
            <li
              key={index}
              onClick={() => closeFn(false)}
              className="mobile-nav__item"
            >
              <Link className="link--no-underline" to={item.url}>
                {item.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MobileNav;
