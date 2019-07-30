import * as React from 'react';
import { IRecipe } from '../types';
import { Link } from 'react-router-dom';

interface Props {
  recipe: IRecipe;
}

function RecipeCard({ recipe }: Props) {
  const { title, tags, image, slug } = recipe;
  const defaultImage =
    'https://images.unsplash.com/photo-1522784081430-8ac6a122cbc8?q=75&fm=jpg&w=1080&fit=max';

  return (
    <Link className="link--no-underline" to={`/recipes/${slug}`}>
      <div className="recipe-card">
        <div className="recipe-card__image-container">
          <img
            className="recipe-card__image"
            src={image.medium || defaultImage}
            alt=""
          />
        </div>
        <div className="recipe-card__info">
          <h2 className="recipe-card__title">{title}</h2>

          {tags.length > 0 && (
            <div className="recipe-tags">
              {tags.map((tag, index) => (
                <div key={index} className="recipe-tag">
                  <span>{tag}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

export default RecipeCard;
