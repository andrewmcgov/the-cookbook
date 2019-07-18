import * as React from 'react';

import { mountWithRouter } from '../testingUtilities';
import MobileNav from '../MobileNav';

describe('<MobileNav />', () => {
  it('calls the closeFn when the close button is clicked', () => {
    const spy = jest.fn();
    const wrapper = mountWithRouter(<MobileNav isOpen={false} closeFn={spy} />);
    const button = wrapper.find('.mobile-nav__close-button');

    button.simulate('click');
    expect(spy).toHaveBeenCalled();
  });
});
