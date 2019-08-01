import * as React from 'react';

import { mountWithApolloMock, wait, fillOutForm } from '../testingUtilities';
import SignUp, { SIGN_UP_MUTATION } from './SignUp';

const signUpVariables = {
  firstName: 'first name',
  lastName: 'last name',
  email: 'email@test.com',
  password: 'password',
  repeatPassword: 'password',
  signupKey: 'key'
};

const mocks = [
  {
    request: {
      query: SIGN_UP_MUTATION,
      variables: signUpVariables
    },
    result: { data: {} }
  }
];

describe('<SignUp />', () => {
  it('renders without error', () => {
    mountWithApolloMock(<SignUp />, []);
  });

  it('renders a button that will submit the form', () => {
    const wrapper = mountWithApolloMock(<SignUp />, []);
    const form = wrapper.find('form');
    const button = form.find('button[type="submit"]');

    expect(button.exists()).toBeTruthy();
  });

  it('shows a loading state when the form is submitted', async () => {
    const wrapper = mountWithApolloMock(<SignUp />, mocks);
    const form = wrapper.find('form');

    fillOutForm(wrapper, signUpVariables);

    form.simulate('submit');

    expect(wrapper.find('fieldset').prop('disabled')).toBeTruthy();
  });
});
