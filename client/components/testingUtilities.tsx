import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import { MockedProvider, MockedResponse } from 'react-apollo/test-utils';

import { UserContext, IUserContext } from './user-context';

export function mountWithRouter(element: JSX.Element) {
  return mount(<Router>{element}</Router>);
}

export function mountWithApolloMock(
  element: JSX.Element,
  mocks: MockedResponse[]
) {
  return mount(
    <MockedProvider mocks={mocks} addTypename={false}>
      {element}
    </MockedProvider>
  );
}

export function mountWithRouterAndApollo(
  element: JSX.Element,
  mocks: MockedResponse[]
) {
  return mount(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Router>{element}</Router>
    </MockedProvider>
  );
}

export function mountWithFullApp(
  element: JSX.Element,
  user: IUserContext,
  mocks: MockedResponse[]
) {
  return mount(
    <Router>
      <MockedProvider mocks={mocks} addTypename={false}>
        <UserContext.Provider value={user}>{element}</UserContext.Provider>
      </MockedProvider>
    </Router>
  );
}

// https://github.com/wesbos/waait/blob/master/index.js
export function wait(amount: number = 0) {
  return new Promise(resolve => setTimeout(resolve, amount));
}

export function fillOutForm(wrapper: ReactWrapper, inputsObject: any) {
  Object.keys(inputsObject).forEach(input => {
    wrapper
      .find(`[name="${input}"]`)
      .simulate('change', { target: { value: inputsObject[input] } });
  });
}
