import * as React from 'react';
import { Mutation, MutationFn, MutationResult } from 'react-apollo';
import gql from 'graphql-tag';
import { Redirect } from 'react-router';

import { UserContext } from '../user-context';
import Page from '../Page';
import RecipeForm from '../RecipeForm';
import Error from '../Error';
import AccountForms from '../AccountForms';
import { GET_RECIPES_QUERY } from '../queries';
import { IRecipe } from '../types';

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
  const currentUser = React.useContext(UserContext);

  if (!currentUser.firstName) {
    return (
      <Page title="Add new Recipe!">
        <p>Please sign in to add a new recipe.</p>
        <AccountForms />
      </Page>
    );
  }

  return (
    <Page title="Add new Recipe!">
      <Mutation
        mutation={CREATE_RECIPE_MUTATION}
        refetchQueries={[{ query: GET_RECIPES_QUERY }]}
      >
        {(
          createRecipe: MutationFn,
          { loading, error, data }: MutationResult<CreateRecipeMutationResult>
        ) => {
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
