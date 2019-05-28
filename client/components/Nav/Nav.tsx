import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => (
  <nav>
    <ul className="nav">
      <li className="nav__item">
        <Link to="/">Home</Link>
      </li>
      <li className="nav__item">
        <Link to="/account">Account</Link>
      </li>
      <li className="nav__item">
        <Link to="/recipes/new">New Recipe</Link>
      </li>
    </ul>
  </nav>
);

export default Nav;
