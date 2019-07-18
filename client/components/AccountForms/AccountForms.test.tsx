import * as React from 'react';

import { mountWithRouterAndApollo } from '../testingUtilities';
import AccountForms from '../AccountForms';
import SignIn from '../SignIn';
import SignUp from '../SignUp';

describe('<AccountForms />', () => {
  it('renders <SignIn /> by default', () => {
    const wrapper = mountWithRouterAndApollo(<AccountForms />, []);

    expect(wrapper.find(SignIn).exists()).toBeTruthy();
    expect(wrapper.find('.account-forms__toggle-link').exists()).toBeTruthy();
  });
});

describe('<AccountForms />', () => {
  it('renders <SignUp /> when toggled', () => {
    const wrapper = mountWithRouterAndApollo(<AccountForms />, []);
    const toggle = wrapper.find('.account-forms__toggle-link');

    expect(toggle.exists()).toBeTruthy();
    toggle.simulate('click');
    expect(wrapper.find(SignIn).exists()).toBeFalsy();
    expect(wrapper.find(SignUp).exists()).toBeTruthy();
  });
});

describe('<AccountForms />', () => {
  it('renders <SignIn /> when toggled twice', () => {
    const wrapper = mountWithRouterAndApollo(<AccountForms />, []);

    wrapper.find('.account-forms__toggle-link').simulate('click');
    expect(wrapper.find(SignUp).exists()).toBeTruthy();

    wrapper.find('.account-forms__toggle-link').simulate('click');
    expect(wrapper.find(SignIn).exists()).toBeTruthy();
  });
});
