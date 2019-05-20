import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

type Props = {
  isOpen: boolean;
  closeFn: any;
};

const MobileNav = (props: Props) => {
  const { isOpen, closeFn } = props;

  return (
    <div className={`mobile-nav__wrapper ${isOpen && 'mobile-nav--open'}`}>
      <div className="mobile-nav__header">
        <h3 className="mobile-nav__title">Menu</h3>
        <button
          className="mobile-nav__close-button"
          onClick={() => closeFn(false)}
        >
          <FontAwesomeIcon
            icon={faTimes}
            size={'lg'}
            className="mobile-nav_close-icon"
          />
        </button>
      </div>
      <ul className="mobile-nav">
        <li onClick={() => closeFn(false)} className="mobile-nav__item">
          <Link to="/">Home</Link>
        </li>
        <li onClick={() => closeFn(false)} className="mobile-nav__item">
          <Link to="/account">Account</Link>
        </li>
      </ul>
    </div>
  );
};

export default MobileNav;
