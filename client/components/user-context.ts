import React from 'react';

interface IUserContext {
  firstName?: string;
  lastName?: string;
  _id?: string;
}

export const UserContext = React.createContext<IUserContext>({});
