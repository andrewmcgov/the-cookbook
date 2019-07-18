import * as React from 'react';
import { shallow } from 'enzyme';

import { mountWithRouter } from '../testingUtilities';
import Header from '../Header';
import MobileNav from '../MobileNav';
import Nav from '../Nav';

describe('<Header />', () => {
  it('renders a closed <MobileNav /> by default', () => {
    const wrapper = shallow(<Header />);
    const mobileNav = wrapper.find(MobileNav);

    expect(mobileNav.exists()).toBeTruthy();
    expect(mobileNav.props().isOpen).toBeFalsy();
  });

  it('renders a <Nav /> component', () => {
    const wrapper = shallow(<Header />);

    expect(wrapper.find(Nav).exists()).toBeTruthy();
  });

  it('renders a <MobileNav /> component', () => {
    const wrapper = shallow(<Header />);

    expect(wrapper.find(MobileNav).exists()).toBeTruthy();
  });

  it('toggles the mobile nav when nav buttons are clicked', () => {
    const wrapper = mountWithRouter(<Header />);
    const openButton = wrapper.find('.mobile-nav__trigger');
    const closeButton = wrapper.find('.mobile-nav__close-button');

    expect(openButton.exists()).toBeTruthy();
    openButton.simulate('click');
    expect(wrapper.find(MobileNav).props().isOpen).toBeTruthy();
    closeButton.simulate('click');
    expect(wrapper.find(MobileNav).props().isOpen).toBeFalsy();
  });
});
