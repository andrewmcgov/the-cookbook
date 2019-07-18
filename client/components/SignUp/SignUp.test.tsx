import * as React from 'react';
import * as wait from 'waait';

import { mountWithApolloMock } from '../testingUtilities';
import SignUp from '../SignUp';

describe('<SignUp />', () => {
  it('renders without error', () => {
    mountWithApolloMock(<SignUp />, []);
  });

  it('renders a button that will submit the form', async () => {
    const wrapper = mountWithApolloMock(<SignUp />, []);
    const form = wrapper.find('form');
    const button = form.find('button[type="submit"]');

    expect(button.exists()).toBeTruthy();
  });
});
