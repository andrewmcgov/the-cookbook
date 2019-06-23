export interface IUser extends Document {
  email: string;
  firstName: string;
  lastName: string;
  password?: string;
  _id?: string;
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
  image: {
    small: string;
    medium: string;
    large: string;
  };
  createdAt: string;
  updatedAt: string;
  slug: string;
}

export interface ICurrentUserQuery {
  currentUser?: IUser;
}
