import * as React from 'react';
import { Link } from 'react-router-dom';

import { mountWithRouter } from '../testingUtilities';
import MobileNav from '../MobileNav';

import { INavItem } from '../types';

const NavItems: INavItem[] = [
  { name: 'Home', url: '/' },
  { name: 'Account', url: '/account' },
  { name: 'Add Recipe', url: '/recipes/new' }
];

describe('<MobileNav />', () => {
  it('calls the closeFn when the close button is clicked', () => {
    const spy = jest.fn();
    const wrapper = mountWithRouter(
      <MobileNav items={NavItems} isOpen={false} closeFn={spy} />
    );
    const button = wrapper.find('.mobile-nav__close-button');

    button.simulate('click');
    expect(spy).toHaveBeenCalled();
  });

  it('renders a link for each item it is passed', () => {
    const spy = jest.fn();
    const wrapper = mountWithRouter(
      <MobileNav items={NavItems} isOpen={false} closeFn={spy} />
    );

    expect(wrapper.find(Link).length).toBe(NavItems.length);
  });

  it('uses the correct url and name in links', () => {
    const spy = jest.fn();
    const wrapper = mountWithRouter(
      <MobileNav items={NavItems} isOpen={false} closeFn={spy} />
    );

    const link = wrapper.find(Link).first();

    expect(link.find('a').prop('href')).toBe(NavItems[0].url);
    expect(link.find('a').html()).toContain(NavItems[0].name);
  });
});
