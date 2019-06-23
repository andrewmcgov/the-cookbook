import { Document, Types } from 'mongoose';

export interface IUser extends Document {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface ICreateUser {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  repeatPassword: string;
  signupKey: string;
}

export interface IIngredient {
  amount: string;
  name: string;
}

export interface IRecipe extends Document {
  title: string;
  description: string;
  ingredients: IIngredient[];
  instructions: string[];
  image: {
    small: string;
    medium: string;
    large: string;
  };
  author: Types.ObjectId;
  createdAt: string;
  updatedAt: string;
  slug: string;
}

export interface IAuthour {
  _id: string;
  recipes: IRecipe[];
}
