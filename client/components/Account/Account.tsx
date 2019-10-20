import * as React from 'react';
import {useQuery} from 'react-apollo';

import Page from '../Page';
import SignOut from '../SignOut';
import Error from '../Error';
import RecipeCard from '../RecipeCard';
import {UserContext} from '../user-context';
import {GET_RECIPES_BY_AUTHOR} from '../queries';
import {IRecipe} from '../types';

interface RecipeResult {
  getRecipesByAuthor: IRecipe[];
}

interface RecipeVariables {
  author: string;
}

function Account() {
  const currentUser = React.useContext(UserContext);
  const {data, loading, error} = useQuery<RecipeResult, RecipeVariables>(GET_RECIPES_BY_AUTHOR, {
    variables: {
      author: currentUser._id
    }
  });

  const loadingMarkup = loading ? <p>Loading...</p> : null;
  const errorMarkup = error ? <Error error={error} /> : null;

  const recipes = data && data.getRecipesByAuthor;

  const noRecipesMarkup = !loading && !error && recipes.length < 1 ? (
    <p>
      Looks like you have not added any recipes! Add your first one{' '}
      <a href="/recipes/new">here.</a>
    </p>
  ) : null;
  
  const recipesMarkup = !loading && !error && recipes.length > 0 ? (
    <div className="recipe-card-loop">
      {recipes.map(recipe => (
        <RecipeCard key={recipe.slug} recipe={recipe} />
      ))}
    </div>
  ) : null;
 

  return (
    <Page title={`${currentUser.firstName} ${currentUser.lastName}`}>
      <h5>Your recipes:</h5>
      {loadingMarkup}
      {errorMarkup}
      {noRecipesMarkup}
      {recipesMarkup}
      <SignOut />
    </Page>
}

export default Account;
