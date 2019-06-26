import React from 'react';
import { MutationFn } from 'react-apollo';
import { IconContext } from 'react-icons';
import { FiTrash2 } from 'react-icons/fi';

import ImageDropzone from './components/ImageDropzone';
import { IRecipe } from '../types';
import { Link } from 'react-router-dom';

interface ImageResponse {
  image?: {
    small: string;
    medium: string;
    large: string;
  };
  errorMessage?: string;
}

interface Props {
  onSubmit: MutationFn;
  loading: boolean;
  recipe?: IRecipe;
}

function RecipeForm({ recipe, onSubmit, loading }: Props) {
  const [slug, updateSlug] = React.useState(recipe ? recipe.slug : '');
  const [title, updateTitle] = React.useState(recipe ? recipe.title : '');
  const [description, updateDescription] = React.useState(
    recipe ? recipe.description : ''
  );
  const [ingredients, updateIngredients] = React.useState(
    recipe ? recipe.ingredients : [{ amount: '', name: '' }]
  );
  const [instructions, updateInstructions] = React.useState(
    recipe ? recipe.instructions : ['']
  );
  const [image, updateimage] = React.useState(
    recipe
      ? recipe.image
      : {
          medium: '',
          large: ''
        }
  );

  function addIngredient(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const newIngredients = [...ingredients];
    newIngredients.push({ name: '', amount: '' });
    updateIngredients(newIngredients);
  }

  function removeIngredient(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const ingredientIndex = parseInt(
      e.currentTarget.getAttribute('data-index')
    );
    const newIngredients = [...ingredients];
    newIngredients.splice(ingredientIndex, 1);
    updateIngredients(newIngredients);
  }

  function handleIngredientChange(e: React.ChangeEvent<HTMLInputElement>) {
    const ingredientIndex = parseInt(
      e.currentTarget.getAttribute('data-index')
    );
    const ingredientValueName = e.target.getAttribute('data-name');
    const newIngredients = [...ingredients];
    newIngredients[ingredientIndex][ingredientValueName] = e.target.value;
    updateIngredients(newIngredients);
  }

  function addInstruction(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const newInstructions = [...instructions];
    newInstructions.push('');
    updateInstructions(newInstructions);
  }

  function removeInstruction(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const instructionIndex = parseInt(
      e.currentTarget.getAttribute('data-index')
    );
    const newInstructions = [...instructions];
    newInstructions.splice(instructionIndex, 1);
    updateInstructions(newInstructions);
  }

  function handleInstructionChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    e.preventDefault();
    const instructionIndex = parseInt(
      e.currentTarget.getAttribute('data-index')
    );
    const newInstructions = [...instructions];
    newInstructions[instructionIndex] = e.target.value;
    updateInstructions(newInstructions);
  }

  function uploadImage(imageFile: File) {
    console.log(imageFile);
  }

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement | HTMLButtonElement>
  ) {
    e.preventDefault();
    onSubmit({
      variables: {
        slug,
        title,
        description,
        ingredients: ingredients.map(ingredient => {
          if (ingredient.__typename) {
            delete ingredient.__typename;
          }
          return ingredient;
        }),
        instructions,
        image: {
          medium: image.medium,
          large: image.large
        }
      }
    });
  }

  return (
    <>
      <form action="" className="recipe-form" onSubmit={handleSubmit}>
        <fieldset disabled={loading}>
          <label htmlFor="title">
            Title
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={e => updateTitle(e.target.value)}
              required
            />
          </label>
          <label htmlFor="description">
            Description
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={e => updateDescription(e.target.value)}
              required
              rows={4}
            />
          </label>
          <h3>Image</h3>
          <ImageDropzone
            onImageChange={uploadImage}
            currentImage={image.medium}
          />
          <h3>Ingredients</h3>
          {ingredients.length > 0 &&
            ingredients.map((ingredient, index) => (
              <div key={index}>
                <div className="ingredient-row">
                  <label
                    className="ingrediant-row__amount"
                    htmlFor={`ingredient-amount-${index}`}
                  >
                    Amount {index + 1}
                    <input
                      type="text"
                      id={`ingredient-amount-${index}`}
                      name={`ingredient-amount-${index}`}
                      onChange={handleIngredientChange}
                      value={ingredient.amount}
                      data-index={index}
                      data-name="amount"
                      required
                    />
                  </label>
                  <label
                    htmlFor={`ingredient-name-${index}`}
                    className="ingrediant-row__name"
                  >
                    Ingredient Name {index + 1}
                    <input
                      type="text"
                      id={`ingredient-name-${index}`}
                      name={`ingredient-name-${index}`}
                      onChange={handleIngredientChange}
                      value={ingredient.name}
                      data-index={index}
                      data-name="name"
                      required
                    />
                  </label>
                  <div className="ingredient-row__remove-button">
                    <button onClick={removeIngredient} data-index={index}>
                      <IconContext.Provider value={{ size: '2rem' }}>
                        <FiTrash2 />
                      </IconContext.Provider>
                    </button>
                  </div>
                </div>
                <hr className="divider" />
              </div>
            ))}
          <div className="button-right-wrapper">
            <button className="button button-secondary" onClick={addIngredient}>
              Add Ingredient
            </button>
          </div>
          <h3>Instructions</h3>
          {instructions.length > 0 &&
            instructions.map((instruction, index) => (
              <div key={index}>
                <div className="instruction-row" key={index}>
                  <label htmlFor={`instruction-${index}`}>
                    Instruction {index + 1}
                    <textarea
                      id={`instruction-${index}`}
                      name={`instruction-${index}`}
                      onChange={handleInstructionChange}
                      value={instruction}
                      data-index={index}
                      required
                      rows={3}
                    />
                  </label>
                  <div className="instruction-row__remove-button">
                    <button onClick={removeInstruction} data-index={index}>
                      <IconContext.Provider value={{ size: '2rem' }}>
                        <FiTrash2 />
                      </IconContext.Provider>
                    </button>
                  </div>
                </div>
                <hr className="divider" />
              </div>
            ))}
          <div className="button-right-wrapper">
            <button
              className="button button-secondary"
              onClick={addInstruction}
            >
              Add Instruction
            </button>
          </div>
        </fieldset>
      </form>
      <div className="recipe-form__buttons button-right-wrapper">
        {slug && (
          <Link
            to={`/recipes/${slug}`}
            className="button button-secondary link--no-underline"
          >
            Cancel
          </Link>
        )}
        <button
          onClick={handleSubmit}
          className="button button-primary"
          type="submit"
        >
          {loading ? 'Saving...' : 'Save Recipe!'}
        </button>
      </div>
    </>
  );
}

export default RecipeForm;
