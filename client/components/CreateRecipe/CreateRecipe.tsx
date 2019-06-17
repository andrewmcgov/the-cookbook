import React from 'react';
import { Mutation, MutationFn } from 'react-apollo';
import gql from 'graphql-tag';
import { Redirect } from 'react-router';

import Page from '../Page';
import RecipeForm from '../RecipeForm';
import Error from '../Error';

const CREATE_RECIPE_MUTATION = gql`
  mutation CREATE_RECIPE_MUTATION(
    $title: String
    $description: String
    $ingredients: [IngredientInput]
    $instructions: [String]
    $image: ImageInput
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
      image {
        small
        medium
        large
      }
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
        {(createRecipe: MutationFn, { loading, error, data }) => {
          if (error) return <Error error={error} />;

          if (data && data.createRecipe) {
            const slug = data.createRecipe.slug;

            if (slug) {
              return <Redirect to={`/recipes/${slug}`} />;
            }
          }

          return (
            <div>
              {error && <Error error={error} />}
              <RecipeForm onSubmit={createRecipe} loading={loading} />
            </div>
          );
        }}
      </Mutation>
    </Page>
  );
}

export default CreateRecipe;
