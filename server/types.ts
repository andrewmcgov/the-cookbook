import { Document, Types } from 'mongoose';

export interface IUser extends Document {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
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
  author: Types.ObjectId;
  createdAt: string;
  updatedAt: string;
  slug: string;
}
