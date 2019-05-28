import React from 'react';
import JSONPretty from 'react-json-pretty';
import { MutationFn } from 'react-apollo';

interface Ingredient {
  amount: string;
  name: string;
}

interface State {
  title: string;
  description: string;
  ingredients: Ingredient[];
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

type Actions =
  | ADD_INGREDIENT
  | UPDATE_INGREDIENT_VALUE
  | REMOVE_INGREDIENT
  | UPDATE_FORM_VALUE;

const initialState: State = {
  title: '',
  description: '',
  ingredients: [{ amount: '', name: '' }]
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
    default:
      return {
        ...state
      };
  }
}

function RecipeForm(props: Props) {
  const [{ title, description, ingredients }, dispatch] = React.useReducer(
    formReducer,
    initialState
  );

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

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    props.onSubmit({
      variables: {
        title,
        description,
        ingredients
      }
    });
  }

  return (
    <form action="" className="recipe-form" onSubmit={handleSubmit}>
      <fieldset disabled={props.loading}>
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
                  Remove
                </button>
              </div>
            </div>
          ))}
        <button onClick={addIngredient}>Add Ingredient</button>
      </fieldset>
      {/* <JSONPretty data={{ title, description, ingredients }} /> */}
      <h3>Instructions: Coming soon!</h3>
      <div>
        <button type="submit">Add Recipe!</button>
      </div>
    </form>
  );
}

export default RecipeForm;
