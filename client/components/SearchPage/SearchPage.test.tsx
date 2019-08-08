import * as React from 'react';

import SearchPage, { SEARCH_QUERY } from './SearchPage';
import RecipeCard from '../RecipeCard';
import Page from '../Page';
import Error from '../Error';
import { mountWithFullApp, wait } from '../testingUtilities';
import { mockRecipes } from '../mockResponses';
import { GraphQLError } from 'graphql';

const mocksWithResults = [
  {
    request: {
      query: SEARCH_QUERY,
      variables: {
        searchTerm: 'pizza'
      }
    },
    result: {
      data: {
        search: mockRecipes
      }
    }
  }
];

const mocksWithoutResults = [
  {
    request: {
      query: SEARCH_QUERY,
      variables: {
        searchTerm: 'pizza'
      }
    },
    result: {
      data: {
        search: []
      }
    }
  }
];

const mocksWithError = [
  {
    request: {
      query: SEARCH_QUERY,
      variables: {
        searchTerm: 'pizza'
      }
    },
    errors: [new GraphQLError('Error!')]
  }
];

describe('<SearchPage />', () => {
  it('renders a form with a search input', () => {
    const wrapper = mountWithFullApp(<SearchPage />, {}, []);

    const form = wrapper.find('form');

    expect(form.find('[name="search"]').exists()).toBeTruthy();
  });

  it('does not render search results by default', () => {
    const wrapper = mountWithFullApp(<SearchPage />, {}, []);

    const resultsHeader = wrapper.find('.search-results-header');

    expect(resultsHeader.exists()).toBeFalsy();
    expect(wrapper.find(RecipeCard).exists()).toBeFalsy();
  });

  it('updates the page title when the form is submitted', () => {
    const wrapper = mountWithFullApp(<SearchPage />, {}, mocksWithResults);
    const searchTerm = mocksWithResults[0].request.variables.searchTerm;
    const form = wrapper.find('form');

    wrapper
      .find('[name="search"]')
      .simulate('change', { target: { value: searchTerm } });

    form.simulate('submit');

    expect(wrapper.find(Page).prop('title')).toContain(searchTerm);
  });

  it('renders a loading state when the form is submitted', () => {
    const wrapper = mountWithFullApp(<SearchPage />, {}, mocksWithResults);
    const form = wrapper.find('form');

    form
      .find('[name="search"]')
      .simulate('change', { target: { value: 'searchTerm' } });

    form.simulate('submit');

    expect(wrapper.find('.search-loading').text()).toContain('Searching for');
  });

  it('renders renders one item for each search result passed', async () => {
    const wrapper = mountWithFullApp(<SearchPage />, {}, mocksWithResults);
    const searchTerm = mocksWithResults[0].request.variables.searchTerm;
    const expectedCount = mocksWithResults[0].result.data.search.length;
    const form = wrapper.find('form');

    form
      .find('[name="search"]')
      .simulate('change', { target: { value: searchTerm } });

    form.simulate('submit');

    await wait(0);
    wrapper.update();

    expect(wrapper.find(RecipeCard).length).toBe(expectedCount);
  });

  it('renders renders a message if no results are found', async () => {
    const wrapper = mountWithFullApp(<SearchPage />, {}, mocksWithoutResults);
    const searchTerm = mocksWithResults[0].request.variables.searchTerm;
    const form = wrapper.find('form');

    form
      .find('[name="search"]')
      .simulate('change', { target: { value: searchTerm } });

    form.simulate('submit');

    await wait(0);
    wrapper.update();

    expect(wrapper.find(RecipeCard).exists()).toBeFalsy();
    expect(wrapper.find('.search-results--none').text()).toContain(
      'Could not find any results'
    );
  });

  it('renders an <Error /> if there is an error', async () => {
    const wrapper = mountWithFullApp(<SearchPage />, {}, mocksWithError);
    const searchTerm = mocksWithResults[0].request.variables.searchTerm;
    const form = wrapper.find('form');

    form
      .find('[name="search"]')
      .simulate('change', { target: { value: searchTerm } });

    form.simulate('submit');

    await wait(0);
    wrapper.update();

    expect(wrapper.find(Error).exists()).toBeTruthy();
  });
});
