import * as React from 'react';

import { mountWithFullApp, wait } from '../testingUtilities';
import { GET_RECIPES_BY_AUTHOR } from '../queries';
import { mockRecipesByAuthor } from '../mockResponses';
import Account from '../Account';
import AccountForms from '../AccountForms';
import SignOut from '../SignOut';
import Page from '../Page';
import RecipeCard from '../RecipeCard';

const user = {
  firstName: 'Johnny',
  lastName: 'Test',
  _id: '123456abcdef'
};

const mocks = [
  {
    request: {
      query: GET_RECIPES_BY_AUTHOR,
      variables: {
        author: user._id
      }
    },
    result: {
      data: {
        getRecipesByAuthor: mockRecipesByAuthor
      }
    }
  }
];

describe('<Account />', () => {
  it('renders <AccountForms /> when there is no currentUser', () => {
    const wrapper = mountWithFullApp(<Account />, {}, []);

    expect(wrapper.find(AccountForms).exists()).toBeTruthy();
  });

  it('does not render <Signout /> when there is no user', () => {
    const wrapper = mountWithFullApp(<Account />, {}, []);

    expect(wrapper.find(SignOut).exists()).toBeFalsy();
  });

  it('does not render <AccountForms /> when there is user', () => {
    const wrapper = mountWithFullApp(<Account />, user, []);

    expect(wrapper.find(AccountForms).exists()).toBeFalsy();
  });

  it('does render <Signout /> when there is a user', () => {
    const wrapper = mountWithFullApp(<Account />, user, []);

    expect(wrapper.find(SignOut).exists()).toBeTruthy();
  });

  it('passes the users firstName and lastName to the <Page />', () => {
    const wrapper = mountWithFullApp(<Account />, user, []);
    const expectedTitle = `${user.firstName} ${user.lastName}`;

    expect(wrapper.find(Page).props().title).toBe(expectedTitle);
  });

  it('renders a loading state while loading the users recipes', () => {
    const wrapper = mountWithFullApp(<Account />, user, []);

    expect(wrapper.find('main p').text()).toBe('Loading...');
  });

  it('renders a <RecipeCard /> for each recipe', async () => {
    const wrapper = mountWithFullApp(<Account />, user, mocks);
    const recipesCount = mocks[0].result.data.getRecipesByAuthor.length;

    await wait(0);
    wrapper.update();

    expect(wrapper.find(RecipeCard).length).toBe(recipesCount);
  });

  it('passes a recipe to each <RecipeCard />', async () => {
    const wrapper = mountWithFullApp(<Account />, user, mocks);
    const recipe = mocks[0].result.data.getRecipesByAuthor[0]._id;

    await wait(0);
    wrapper.update();

    expect(
      wrapper
        .find(RecipeCard)
        .first()
        .props().recipe._id
    ).toBe(recipe);
  });
});
