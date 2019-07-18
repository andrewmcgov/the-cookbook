import * as React from 'react';
import { MutationFn } from 'react-apollo';
import { IconContext } from 'react-icons';
import { FiTrash2 } from 'react-icons/fi';

import ImageDropzone from './components/ImageDropzone';
import { IRecipe } from '../types';
import { Link } from 'react-router-dom';

interface Props {
  onSubmit: MutationFn;
  loading: boolean;
  recipe?: IRecipe;
}

function RecipeForm({ recipe, onSubmit, loading }: Props) {
  const [slug] = React.useState(recipe ? recipe.slug : '');
  const [title, setTitle] = React.useState(recipe ? recipe.title : '');
  const [description, setDescription] = React.useState(
    recipe ? recipe.description : ''
  );
  const [ingredients, setIngredients] = React.useState(
    recipe ? recipe.ingredients : [{ amount: '', name: '' }]
  );
  const [instructions, setInstructions] = React.useState(
    recipe ? recipe.instructions : ['']
  );
  const [image, setImage] = React.useState(
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
    setIngredients(newIngredients);
  }

  function removeIngredient(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const ingredientIndex = parseInt(
      e.currentTarget.getAttribute('data-index')
    );
    const newIngredients = [...ingredients];
    newIngredients.splice(ingredientIndex, 1);
    setIngredients(newIngredients);
  }

  function handleIngredientChange(e: React.ChangeEvent<HTMLInputElement>) {
    const ingredientIndex = parseInt(
      e.currentTarget.getAttribute('data-index')
    );
    const ingredientValueName = e.target.getAttribute('data-name');
    const newIngredients = [...ingredients];
    newIngredients[ingredientIndex][ingredientValueName] = e.target.value;
    setIngredients(newIngredients);
  }

  function addInstruction(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const newInstructions = [...instructions];
    newInstructions.push('');
    setInstructions(newInstructions);
  }

  function removeInstruction(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const instructionIndex = parseInt(
      e.currentTarget.getAttribute('data-index')
    );
    const newInstructions = [...instructions];
    newInstructions.splice(instructionIndex, 1);
    setInstructions(newInstructions);
  }

  function handleInstructionChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    e.preventDefault();
    const instructionIndex = parseInt(
      e.currentTarget.getAttribute('data-index')
    );
    const newInstructions = [...instructions];
    newInstructions[instructionIndex] = e.target.value;
    setInstructions(newInstructions);
  }

  async function uploadImage(imageFile: File) {
    const data = new FormData();
    data.append('file', imageFile);
    data.append('upload_preset', 'the-cookbook');
    try {
      const res = await fetch(
        'https://api.cloudinary.com/v1_1/dlmkq8soe/upload',
        {
          method: 'POST',
          body: data
        }
      );
      const file = await res.json();
      setImage({
        medium: file.eager[0].secure_url,
        large: file.secure_url
      });
    } catch (err) {
      console.error(`Error uploading image: ${err}`);
    }
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
              onChange={e => setTitle(e.target.value)}
              required
            />
          </label>
          <label htmlFor="description">
            Description
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={e => setDescription(e.target.value)}
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
