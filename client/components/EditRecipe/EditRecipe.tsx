import * as React from 'react';
import gql from 'graphql-tag';
import { RouteComponentProps, Redirect } from 'react-router';
import {
  Mutation,
  Query,
  MutationFn,
  MutationResult,
  QueryResult
} from 'react-apollo';

import Page from '../Page';
import RecipeForm from '../RecipeForm';
import Error from '../Error';
import { GET_RECIPE_QUERY } from '../queries';
import { IRecipe } from '../types';

const EDIT_RECIPE_MUTATION = gql`
  mutation EDIT_RECIPE_MUTATION(
    $slug: String
    $title: String
    $description: String
    $tags: [String]
    $ingredients: [IngredientInput]
    $instructions: [String]
    $image: ImageInput
  ) {
    editRecipe(
      slug: $slug
      title: $title
      description: $description
      tags: $tags
      ingredients: $ingredients
      instructions: $instructions
      image: $image
    ) {
      _id
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
      author {
        name
        _id
      }
      createdAt
      updatedAt
      slug
    }
  }
`;

type Params = { id: string };

interface GetRecipeQueryResult {
  getRecipe: IRecipe;
}

interface EditRecipeMutationResult {
  editRecipe: IRecipe;
}

function EditRecipe({ match }: RouteComponentProps<Params>) {
  return (
    <Query query={GET_RECIPE_QUERY} variables={{ slug: match.params.id }}>
      {({ data, loading, error }: QueryResult<GetRecipeQueryResult>) => {
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
            <Mutation
              mutation={EDIT_RECIPE_MUTATION}
              refetchQueries={[
                { query: GET_RECIPE_QUERY, variables: { slug: recipe.slug } }
              ]}
            >
              {(
                editRecipe: MutationFn,
                {
                  loading,
                  error,
                  data
                }: MutationResult<EditRecipeMutationResult>
              ) => {
                if (error) return <Error error={error} />;

                if (data && data.editRecipe) {
                  const slug = data.editRecipe.slug;

                  if (slug) {
                    return <Redirect to={`/recipes/${slug}`} />;
                  }
                }

                return (
                  <RecipeForm
                    onSubmit={editRecipe}
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
