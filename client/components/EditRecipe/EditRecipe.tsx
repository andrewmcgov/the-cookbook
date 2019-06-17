import React from 'react';
import { Mutation, Query, MutationFn } from 'react-apollo';
import gql from 'graphql-tag';
import { RouteComponentProps, Redirect } from 'react-router';
import { Link } from 'react-router-dom';

import Page from '../Page';
import RecipeForm from '../RecipeForm';
import Error from '../Error';
import { GET_RECIPE } from '../queries';
import { IRecipe } from '../types';

const EDIT_RECIPE_MUTATION = gql`
  mutation EDIT_RECIPE_MUTATION(
    $slug: String
    $title: String
    $description: String
    $ingredients: [IngredientInput]
    $instructions: [String]
    $image: ImageInput
  ) {
    editRecipe(
      slug: $slug
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

type Params = { id: string };

function EditRecipe({ match }: RouteComponentProps<Params>) {
  return (
    <Query query={GET_RECIPE} variables={{ slug: match.params.id }}>
      {({ data, loading, error }) => {
        if (loading) {
          return <Page title="loading..." />;
        }
        if (error) {
          return (
            <Page title={'test'}>
              <Error error={error} />
            </Page>
          );
        }

        const recipe: IRecipe = data.getRecipe;

        return (
          <Page title={`Edit ${recipe.title}`}>
            <Link to={`/recipes/${recipe.slug}`}>Cancel</Link>
            <Mutation mutation={EDIT_RECIPE_MUTATION}>
              {(createRecipe: MutationFn, { loading, error, data }) => {
                if (error) return <Error error={error} />;
                if (data && data.editRecipe) {
                  const slug = data.editRecipe.slug;

                  if (slug) {
                    return <Redirect to={`/recipes/${slug}`} />;
                  }
                }
                return (
                  <RecipeForm
                    onSubmit={createRecipe}
                    loading={loading}
                    recipe={recipe}
                  />
                );
              }}
            </Mutation>
          </Page>
        );
      }}
    </Query>
  );
}

export default EditRecipe;
