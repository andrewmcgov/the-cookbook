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
  __typename?: string;
}

export interface IRecipe {
  _id: string;
  title: string;
  description: string;
  tags: string[];
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

export interface INavItem {
  name: string;
  url: string;
}
