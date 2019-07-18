import * as React from 'react';
import { Query, QueryResult } from 'react-apollo';

import Page from '../Page';
import AccountForms from '../AccountForms';
import SignOut from '../SignOut';
import Error from '../Error';
import RecipeCard from '../RecipeCard';
import { UserContext } from '../user-context';
import { GET_RECIPES_BY_AUTHOR } from '../queries';
import { IRecipe } from '../types';

interface RecipeResult {
  getRecipesByAuthor: IRecipe[];
}

function Account() {
  const currentUser = React.useContext(UserContext);

  if (currentUser.firstName)
    return (
      <Page title={`${currentUser.firstName} ${currentUser.lastName}`}>
        <h5>Your recipes:</h5>
        <Query
          query={GET_RECIPES_BY_AUTHOR}
          variables={{ author: currentUser._id }}
        >
          {({ data, loading, error }: QueryResult<RecipeResult>) => {
            if (error) {
              return <Error error={error} />;
            }

            if (loading) {
              return <p>Loading...</p>;
            }

            const recipes = data.getRecipesByAuthor;

            if (recipes.length < 1) {
              return (
                <p>
                  Looks like you have not added any recipes! Add your first one{' '}
                  <a href="/recipes/new">here.</a>
                </p>
              );
            }

            return (
              <div className="recipe-card-loop">
                {recipes.map(recipe => (
                  <RecipeCard key={recipe.slug} recipe={recipe} />
                ))}
              </div>
            );
          }}
        </Query>
        <SignOut />
      </Page>
    );

  return (
    <Page title="Account">
      <AccountForms />
    </Page>
  );
}

export default Account;
