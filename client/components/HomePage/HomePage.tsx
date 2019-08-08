import * as React from 'react';
import { useQuery } from 'react-apollo';

import RecipeCard from '../RecipeCard';
import Error from '../Error';
import Page from '../Page';
import { IRecipe } from '../types';
import { GET_RECIPES_QUERY } from '../queries';

interface RecipesResult {
  getRecipes: IRecipe[];
}

function HomePage() {
  const { data, loading, error } = useQuery<RecipesResult>(GET_RECIPES_QUERY);

  if (loading) {
    return <h3>Loading...</h3>;
  }

  if (error) {
    return <Error error={error} />;
  }

  return (
    <Page>
      <div className="recipe-card-loop">
        {data.getRecipes.map(recipe => (
          <RecipeCard key={recipe.slug} recipe={recipe} />
        ))}
      </div>
    </Page>
  );
}

export default HomePage;
