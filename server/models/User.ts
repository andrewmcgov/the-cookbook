import { Schema, model } from 'mongoose';

import { IUser } from '../types';

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

export default model<IUser>('User', userSchema);
