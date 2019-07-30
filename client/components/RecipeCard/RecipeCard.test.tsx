import * as React from 'react';
import { Link } from 'react-router-dom';

import RecipeCard from '../RecipeCard';
import { mockRecipe } from '../mockResponses';
import { mountWithRouter } from '../testingUtilities';

describe(`<RecipeCard />`, () => {
  it('renders without error', () => {
    mountWithRouter(<RecipeCard recipe={mockRecipe} />);
  });

  it('links to the correct recipe page', () => {
    const wrapper = mountWithRouter(<RecipeCard recipe={mockRecipe} />);

    expect(wrapper.find(Link).prop('to')).toBe(`/recipes/${mockRecipe.slug}`);
  });

  it('displays the recipe image', () => {
    const wrapper = mountWithRouter(<RecipeCard recipe={mockRecipe} />);

    expect(wrapper.find('img').prop('src')).toBe(mockRecipe.image.medium);
  });

  it('displays the recipe title', () => {
    const wrapper = mountWithRouter(<RecipeCard recipe={mockRecipe} />);

    expect(wrapper.find('.recipe-card__title').text()).toBe(mockRecipe.title);
  });

  it('displays one tag for each recipe tag', () => {
    const wrapper = mountWithRouter(<RecipeCard recipe={mockRecipe} />);

    expect(wrapper.find('.recipe-tag').length).toBe(mockRecipe.tags.length);
  });
});
