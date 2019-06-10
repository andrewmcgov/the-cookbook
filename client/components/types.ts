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

export interface IRecipe {
  title: string;
  description: string;
  ingredients: IIngredient[];
  instructions: string[];
  author: IUser;
  image: string;
  createdAt: string;
  updatedAt: string;
  slug: string;
}
