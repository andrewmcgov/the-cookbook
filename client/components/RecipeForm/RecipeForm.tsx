import React, { useState } from 'react';
import JSONPretty from 'react-json-pretty';
import { MutationFn } from 'react-apollo';

import ImageDropzone from './components/ImageDropzone';

interface Ingredient {
  amount: string;
  name: string;
}

interface ImageResponse {
  image?: string;
  errorMessage?: string;
}

interface Props {
  onSubmit: MutationFn;
  loading: boolean;
}

interface UPDATE_FORM_VALUE {
  type: 'UPDATE_FORM_VALUE';
  payload: {
    title?: string;
    description?: string;
  };
}

interface ADD_INGREDIENT {
  type: 'ADD_INGREDIENT';
  payload?: null;
}

type UpdatedIngredient = {
  amount?: string;
  name?: string;
};

interface UPDATE_INGREDIENT_VALUE {
  type: 'UPDATE_INGREDIENT_VALUE';
  payload: {
    ingredientIndex: number;
    updatedIngredient: UpdatedIngredient;
  };
}

interface REMOVE_INGREDIENT {
  type: 'REMOVE_INGREDIENT';
  payload: {
    ingredientIndex: number;
  };
}

interface ADD_INSTRUCTION {
  type: 'ADD_INSTRUCTION';
  payload?: null;
}

interface REMOVE_INSTRUCTION {
  type: 'REMOVE_INSTRUCTION';
  payload: {
    instructionIndex: number;
  };
}

interface UPDATE_INSTRUCTION_VALUE {
  type: 'UPDATE_INSTRUCTION_VALUE';
  payload: {
    instructionIndex: number;
    updatedInstruction: string;
  };
}

interface UPDATE_IMAGE_FILE {
  type: 'UPDATE_IMAGE_FILE';
  payload: {
    imageFile: File | null;
  };
}

interface UPDATE_IMAGE {
  type: 'UPDATE_IMAGE';
  payload: {
    image: string;
  };
}

type Actions =
  | ADD_INGREDIENT
  | UPDATE_INGREDIENT_VALUE
  | REMOVE_INGREDIENT
  | ADD_INSTRUCTION
  | REMOVE_INSTRUCTION
  | UPDATE_INSTRUCTION_VALUE
  | UPDATE_FORM_VALUE
  | UPDATE_IMAGE
  | UPDATE_IMAGE_FILE;

interface State {
  title: string;
  description: string;
  ingredients: Ingredient[];
  instructions: string[];
  image: string;
  imageFile: File | null;
}

const initialState: State = {
  title: '',
  description: '',
  ingredients: [{ amount: '', name: '' }],
  instructions: [''],
  image: '',
  imageFile: null
};

function formReducer(state: State, action: Actions): State {
  switch (action.type) {
    case 'UPDATE_FORM_VALUE':
      return {
        ...state,
        ...action.payload
      };
    case 'ADD_INGREDIENT':
      const newState = { ...state };
      newState.ingredients.push({ amount: '', name: '' });
      return newState;
    case 'UPDATE_INGREDIENT_VALUE':
      const updatedState = { ...state };
      updatedState.ingredients[action.payload.ingredientIndex] = {
        ...updatedState.ingredients[action.payload.ingredientIndex],
        ...action.payload.updatedIngredient
      };
      return updatedState;
    case 'REMOVE_INGREDIENT':
      const newIngredients = [...state.ingredients];
      newIngredients.splice(action.payload.ingredientIndex, 1);
      return {
        ...state,
        ingredients: newIngredients
      };
    case 'ADD_INSTRUCTION':
      const stateWithNewInstruction = { ...state };
      stateWithNewInstruction.instructions.push('');
      return stateWithNewInstruction;
    case 'REMOVE_INSTRUCTION':
      const newInstructions = [...state.instructions];
      newInstructions.splice(action.payload.instructionIndex, 1);
      return {
        ...state,
        instructions: newInstructions
      };
    case 'UPDATE_INSTRUCTION_VALUE':
      const ingredientStateUpdate = { ...state };
      ingredientStateUpdate.instructions[action.payload.instructionIndex] =
        action.payload.updatedInstruction;
      return ingredientStateUpdate;
    case 'UPDATE_IMAGE_FILE':
      return {
        ...state,
        imageFile: action.payload.imageFile
      };
    case 'UPDATE_IMAGE':
      return {
        ...state,
        image: action.payload.image
      };
    default:
      return {
        ...state
      };
  }
}

function RecipeForm(props: Props) {
  const [
    { title, description, ingredients, instructions, image, imageFile },
    dispatch
  ] = React.useReducer(formReducer, initialState);
  const [formSubmitting, setFormSubmitting] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    e.persist();
    dispatch({
      type: 'UPDATE_FORM_VALUE',
      payload: { [e.target.name]: e.target.value }
    });
  }

  function addIngredient(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    dispatch({
      type: 'ADD_INGREDIENT'
    });
  }

  function removeIngredient(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const ingredientIndex = parseInt(
      e.currentTarget.getAttribute('data-index')
    );
    dispatch({
      type: 'REMOVE_INGREDIENT',
      payload: { ingredientIndex }
    });
  }

  function handleIngredientChange(e: React.ChangeEvent<HTMLInputElement>) {
    const ingredientIndex = parseInt(
      e.currentTarget.getAttribute('data-index')
    );
    const ingredientValueName = e.target.getAttribute('data-name');

    dispatch({
      type: 'UPDATE_INGREDIENT_VALUE',
      payload: {
        ingredientIndex,
        updatedIngredient: {
          [ingredientValueName]: e.target.value
        } as UpdatedIngredient
      }
    });
  }

  function addInstruction(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    dispatch({
      type: 'ADD_INSTRUCTION'
    });
  }

  function removeInstruction(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const instructionIndex = parseInt(
      e.currentTarget.getAttribute('data-index')
    );
    dispatch({
      type: 'REMOVE_INSTRUCTION',
      payload: { instructionIndex }
    });
  }

  function handleInstructionChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    const instructionIndex = parseInt(
      e.currentTarget.getAttribute('data-index')
    );
    dispatch({
      type: 'UPDATE_INSTRUCTION_VALUE',
      payload: {
        instructionIndex,
        updatedInstruction: e.target.value
      }
    });
  }

  function updateImageFile(imageFile: File) {
    dispatch({
      type: 'UPDATE_IMAGE_FILE',
      payload: { imageFile }
    });
  }

  async function getAndSetImageUrl() {
    if (imageFile === null) {
      return;
    }
    // Send fetch to backend with image file
    const formData = new FormData();
    formData.append('imageFile', imageFile);
    const data = await fetch('/api/images/save', {
      method: 'POST',
      credentials: 'include',
      body: formData
    });
    const imageResponse: ImageResponse = await data.json();

    // Set returned image to state
    if (imageResponse.image) {
      dispatch({
        type: 'UPDATE_IMAGE',
        payload: {
          image: imageResponse.image
        }
      });
    } else if (imageResponse.errorMessage) {
      console.error(imageResponse.errorMessage);
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormSubmitting(true);
    if (imageFile !== null) {
      const imageSaved = getAndSetImageUrl();
      if (!imageSaved) {
        // will need to show an error message here
        return false;
      }
    }
    props.onSubmit({
      variables: {
        title,
        description,
        ingredients,
        instructions,
        image
      }
    });
    setFormSubmitting(false);
  }

  return (
    <form action="" className="recipe-form" onSubmit={handleSubmit}>
      <fieldset disabled={props.loading || formSubmitting}>
        <label htmlFor="title">
          Title
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="description">
          Description
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={handleChange}
            required
            rows={4}
          />
        </label>
        <h3>Image</h3>
        <ImageDropzone updateImage={updateImageFile} />
        <h3>Ingredients</h3>
        {ingredients.length > 0 &&
          ingredients.map((ingredient, index) => (
            <div className="ingredient-row" key={index}>
              <label htmlFor={`ingredient-amount-${index}`}>
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
              <label htmlFor={`ingredient-amount-${index}`}>
                Ingredient Name {index + 1}
                <input
                  type="text"
                  id={`ingredient-amount-${index}`}
                  name={`ingredient-amount-${index}`}
                  onChange={handleIngredientChange}
                  value={ingredient.name}
                  data-index={index}
                  data-name="name"
                  required
                />
              </label>
              <div className="ingredient-row__remove-button">
                <button onClick={removeIngredient} data-index={index}>
                  Remove Ingredient
                </button>
              </div>
            </div>
          ))}
        <button onClick={addIngredient}>Add Ingredient</button>
        <h3>Instructions</h3>
        {instructions.length > 0 &&
          instructions.map((instruction, index) => (
            <div className="instruction-row" key={index}>
              <label htmlFor={`instruction-${index}`}>
                Instruction {index + 1}
                <input
                  type="text"
                  id={`instruction-${index}`}
                  name={`instruction-${index}`}
                  onChange={handleInstructionChange}
                  value={instruction}
                  data-index={index}
                  required
                />
              </label>
              <div className="instruction-row__remove-button">
                <button onClick={removeInstruction} data-index={index}>
                  Remove Instruction
                </button>
              </div>
            </div>
          ))}
        <button onClick={addInstruction}>Add Instruction</button>
      </fieldset>
      {/* <JSONPretty
        data={{
          title,
          description,
          ingredients,
          instructions,
          imageFile,
          image
        }}
      /> */}
      <div className="recipe-form__submit">
        <button type="submit">Add Recipe!</button>
      </div>
    </form>
  );
}

export default RecipeForm;
