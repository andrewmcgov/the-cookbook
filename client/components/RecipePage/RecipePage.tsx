import * as React from 'react';
import { Query, QueryResult } from 'react-apollo';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';

import Page from '../Page';
import Error from '../Error';
import { GET_RECIPE_QUERY } from '../queries';
import { IRecipe, IIngredient } from '../types';
import { UserContext } from '../user-context';
import DeleteRecipe from '../DeleteRecipe/DeleteRecipe';

type Params = { id: string };

function RecipePage({ match }: RouteComponentProps<Params>) {
  const currentUser = React.useContext(UserContext);
  const defaultImage =
    'https://images.unsplash.com/photo-1522784081430-8ac6a122cbc8?q=75&fm=jpg&w=1080&fit=max';

  return (
    <Query query={GET_RECIPE_QUERY} variables={{ slug: match.params.id }}>
      {({ data, loading, error }: QueryResult) => {
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
          tags,
          ingredients,
          instructions,
          image,
          slug,
          author
        } = recipe;

        return (
          <Page title={title}>
            <div className="recipe__content">
              <img
                className="recipe__image"
                src={image.large || defaultImage}
                alt={title}
              />

              <div className="recipe__info">
                {tags.length > 0 && (
                  <div className="recipe-tags">
                    {tags.map((tag, index) => (
                      <div key={index} className="recipe-tag">
                        <span>{tag}</span>
                      </div>
                    ))}
                  </div>
                )}
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
                    <ol className="recipe__ingredients">
                      {instructions.map((instruction, index: number) => (
                        <li key={index} className="recipe__instruction">
                          {instruction}
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>
            </div>

            {currentUser._id === author._id && (
              <div className="edit-recipe-button">
                <Link
                  className="button button-secondary link--no-underline"
                  to={`/recipes/${slug}/edit`}
                >
                  Edit Recipe
                </Link>
                <DeleteRecipe slug={slug} />
              </div>
            )}
          </Page>
        );
      }}
    </Query>
  );
}

export default RecipePage;
