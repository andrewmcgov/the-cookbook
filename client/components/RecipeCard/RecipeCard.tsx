import React from 'react';
import { IRecipe } from '../types';
import { Link } from 'react-router-dom';

interface Props {
  recipe: IRecipe;
}

function RecipeCard({ recipe }: Props) {
  const { title, description, image, slug } = recipe;
  const defaultImage =
    'https://images.unsplash.com/photo-1522784081430-8ac6a122cbc8?q=75&fm=jpg&w=1080&fit=max';

  return (
    <Link className="recipe-card__link" to={`recipes/${slug}`}>
      <div className="recipe-card">
        <div className="recipe-card__image-wrapper">
          <img
            className="recipe-card__image"
            src={image.medium || defaultImage}
            alt=""
          />
        </div>
        <div className="recipe-card__info">
          <h4 className="recipe-card__title">{title}</h4>
          <p className="recipe-card__description">{description}</p>
        </div>
      </div>
    </Link>
  );
}

export default RecipeCard;
