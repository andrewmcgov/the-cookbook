import * as React from 'react';
import { Link } from 'react-router-dom';
import { INavItem } from '../types';

interface Props {
  items: INavItem[];
}

function Nav({ items }: Props) {
  return (
    <nav>
      <ul className="nav">
        {items.map((item, index) => {
          return (
            <li key={index} className="nav__item">
              <Link to={item.url}>{item.name}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default Nav;
