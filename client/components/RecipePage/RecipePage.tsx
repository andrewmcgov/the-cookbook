import React from 'react';
import { Query } from 'react-apollo';
import { RouteComponentProps } from 'react-router';

import Page from '../Page';
import Error from '../Error';
import { GET_RECIPE } from '../queries';
import { IRecipe, IIngredient } from '../types';
import { Link } from 'react-router-dom';

type Params = { id: string };

function RecipePage({ match }: RouteComponentProps<Params>) {
  const defaultImage =
    'https://images.unsplash.com/photo-1522784081430-8ac6a122cbc8?q=75&fm=jpg&w=1080&fit=max';

  return (
    <Query query={GET_RECIPE} variables={{ slug: match.params.id }}>
      {({ data, loading, error }) => {
        if (loading) {
          return <Page title="Loading..." />;
        }
        if (error) {
          return (
            <Page>
              <Error error={error} />
            </Page>
          );
        }

        const recipe: IRecipe = data.getRecipe;
        const {
          title,
          description,
          ingredients,
          instructions,
          image,
          slug
        } = recipe;

        return (
          <Page title={title}>
            <Link to={`/recipes/${slug}/edit`}>Edit this Recipe</Link>
            <img
              className="recipe__image"
              src={image.medium || defaultImage}
              alt={title}
            />
            <div className="recipe__description">
              <p>{description}</p>
            </div>
            {ingredients.length && (
              <div className="recipe__section">
                <h3 className="recipe__subheading">Ingredients</h3>
                <ul className="recipe__ingredients">
                  {ingredients.map((i: IIngredient, index: number) => (
                    <li key={index} className="recipe__ingredient">
                      {i.amount} - {i.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {instructions.length && (
              <div className="recipe__section">
                <h3 className="recipe__subheading">Instructions</h3>
                <ul className="recipe__ingredients">
                  {instructions.map((instruction, index: number) => (
                    <li key={index} className="recipe__instruction">
                      {instruction}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Page>
        );
      }}
    </Query>
  );
}

export default RecipePage;
