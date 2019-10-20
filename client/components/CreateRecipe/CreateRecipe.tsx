import * as React from 'react';
import {useMutation} from 'react-apollo';
import gql from 'graphql-tag';
import {Redirect} from 'react-router';

import Page from '../Page';
import RecipeForm from '../RecipeForm';
import Error from '../Error';

import {IRecipe} from '../types';

const CREATE_RECIPE_MUTATION = gql`
  mutation CREATE_RECIPE_MUTATION(
    $title: String
    $description: String
    $tags: [String]
    $ingredients: [IngredientInput]
    $instructions: [String]
    $image: ImageInput
  ) {
    createRecipe(
      title: $title
      description: $description
      tags: $tags
      ingredients: $ingredients
      instructions: $instructions
      image: $image
    ) {
      title
      description
      tags
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

interface CreateRecipeMutationResult {
  createRecipe: IRecipe;
}

function CreateRecipe() {
  const [createRecipe, {loading, error, data}] = useMutation<
    CreateRecipeMutationResult
  >(CREATE_RECIPE_MUTATION);

  const errorMarkup = error ? <Error error={error} /> : null;

  return (
    <Page title="Add new Recipe!">
      {errorMarkup}
      {data && data.createRecipe && (
        <Redirect to={`/recipes/${data.createRecipe.slug}`} />
      )}
      <RecipeForm onSubmit={createRecipe} loading={loading} />
    </Page>
  );
}

export default CreateRecipe;
