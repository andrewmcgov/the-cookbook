import * as React from 'react';

import AccountForms from '../AccountForms';
import CreateRecipe from '../CreateRecipe';
import RecipeForm from '../RecipeForm';
import {mountWithFullApp} from '../testingUtilities';

const user = {
  firstName: 'Johnny',
  lastName: 'Test',
  _id: '123456abcdef'
};

describe('<CreateRecipe />', () => {
  it('renders AccountForms if there is no user', () => {
    const wrapper = mountWithFullApp(<CreateRecipe />, {}, []);

    expect(wrapper.find(AccountForms).exists()).toBeTruthy();
  });

  it('does not render AccountForms if there is a user', () => {
    const wrapper = mountWithFullApp(<CreateRecipe />, user, []);

    expect(wrapper.find(AccountForms).exists()).toBeFalsy();
  });

  it('renders RecipeForm if there is a user', () => {
    const wrapper = mountWithFullApp(<CreateRecipe />, user, []);

    expect(wrapper.find(RecipeForm).exists()).toBeTruthy();
  });
});
