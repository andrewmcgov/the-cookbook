import * as React from 'react';
import { act } from 'react-dom/test-utils';

import HomePage from '../HomePage';
import RecipeCard from '../RecipeCard';
import { mountWithFullApp, wait } from '../testingUtilities';
import { GET_RECIPES_QUERY } from '../queries';
import { mockRecipes } from '../mockResponses';

const mocks = [
  {
    request: {
      query: GET_RECIPES_QUERY
    },
    result: {
      data: {
        getRecipes: mockRecipes
      }
    }
  }
];

describe('<HomePage />', () => {
  it('renders without error', () => {
    mountWithFullApp(<HomePage />, {}, mocks);
  });

  it('initially renders a loading state', () => {
    const wrapper = mountWithFullApp(<HomePage />, {}, mocks);

    expect(wrapper.find('h3').text()).toBe('Loading...');
  });

  it('renders one recipeCard for each recipe', async () => {
    const wrapper = mountWithFullApp(<HomePage />, {}, mocks);
    const expectedCount = mocks[0].result.data.getRecipes.length;

    await act(async () => {
      await wait(0);
    });
    wrapper.update();

    expect(wrapper.find(RecipeCard).length).toBe(expectedCount);
  });
});
