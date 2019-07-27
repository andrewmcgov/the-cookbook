import * as React from 'react';
import { Link } from 'react-router-dom';

import { mountWithRouter } from '../testingUtilities';
import Nav from '../Nav';

import { INavItem } from '../types';

const NavItems: INavItem[] = [
  { name: 'Home', url: '/' },
  { name: 'Account', url: '/account' },
  { name: 'Add Recipe', url: '/recipes/new' }
];

describe('<MobileNav />', () => {
  it('renders a link for each item it is passed', () => {
    const wrapper = mountWithRouter(<Nav items={NavItems} />);

    expect(wrapper.find(Link).length).toBe(NavItems.length);
  });

  it('uses the correct url and name in links', () => {
    const wrapper = mountWithRouter(<Nav items={NavItems} />);

    const link = wrapper.find(Link).first();

    expect(link.find('a').prop('href')).toBe(NavItems[0].url);
    expect(link.find('a').html()).toContain(NavItems[0].name);
  });
});
