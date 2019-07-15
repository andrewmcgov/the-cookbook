import React from 'react';
import { Query, QueryResult } from 'react-apollo';

import RecipeCard from '../RecipeCard';
import Error from '../Error';
import Page from '../Page';
import { IRecipe } from '../types';
import { GET_RECIPES_QUERY } from '../queries';

interface RecipesResult {
  getRecipes: IRecipe[];
}

function HomePage() {
  return (
    <Page>
      <Query query={GET_RECIPES_QUERY}>
        {({ data, loading, error }: QueryResult<RecipesResult>) => {
          if (loading) {
            return null;
          }

          if (error) {
            return <Error error={error} />;
          }

          return (
            <div className="recipe-card-loop">
              {data.getRecipes.map(recipe => (
                <RecipeCard key={recipe.slug} recipe={recipe} />
              ))}
            </div>
          );
        }}
      </Query>
    </Page>
  );
}

export default HomePage;
