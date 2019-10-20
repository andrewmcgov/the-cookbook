import * as React from 'react';

import CreateRecipe from '../CreateRecipe';
import RecipeForm from '../RecipeForm';
import {mountWithRouterAndApollo} from '../testingUtilities';

describe('<CreateRecipe />', () => {
  it('renders RecipeForm if there is a user', () => {
    const wrapper = mountWithRouterAndApollo(<CreateRecipe />, []);

    expect(wrapper.find(RecipeForm).exists()).toBeTruthy();
  });
};
