import React from 'react';
import { Mutation, MutationFn } from 'react-apollo';
import gql from 'graphql-tag';

import Page from '../Page';
import RecipeForm from '../RecipeForm';
import Error from '../Error';

const CREATE_RECIPE_MUTATION = gql`
  mutation CREATE_RECIPE_MUTATION(
    $title: String
    $description: String
    $ingredients: [IngredientInput]
    $instructions: [String]
    $image: String
  ) {
    createRecipe(
      title: $title
      description: $description
      ingredients: $ingredients
      instructions: $instructions
      image: $image
    ) {
      title
      description
      ingredients {
        amount
        name
      }
      instructions
      image
      createdAt
      updatedAt
      slug
    }
  }
`;

function CreateRecipe() {
  return (
    <Page title="Add new Recipe!">
      <Mutation mutation={CREATE_RECIPE_MUTATION}>
        {(createRecipe: MutationFn, { loading, error }) => (
          <div>
            {error && <Error error={error} />}
            <RecipeForm onSubmit={createRecipe} loading={loading} />
          </div>
        )}
      </Mutation>
    </Page>
  );
}

export default CreateRecipe;
