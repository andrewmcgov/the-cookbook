import { Schema, model, Types } from 'mongoose';
import * as slug from 'slug';

import { IRecipe } from '../types';

const recipeSchema: Schema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  tags: {
    type: [String]
  },
  ingredients: {
    type: [
      {
        amount: { type: String, required: true },
        name: { type: String, required: true }
      }
    ],
    required: true
  },
  instructions: {
    type: [String],
    required: true
  },
  image: {
    small: {
      type: String
    },
    medium: {
      type: String
    },
    large: {
      type: String
    }
  },
  author: {
    type: Types.ObjectId,
    required: true
  },
  createdAt: {
    type: String
  },
  updatedAt: {
    type: String
  },
  slug: {
    type: String,
    unique: true
  }
});

recipeSchema.index({ title: 'text', description: 'text', ingredients: 'text' });

// Create a unique slug for the recipe
// Shout out @wesbos again here!
recipeSchema.pre<IRecipe>('save', async function(next) {
  // Skip this if the title has not been modified
  if (!this.isModified('title')) {
    next();
    return;
  }

  // Make the slug from the title
  this.slug = slug(this.title.toLowerCase());

  // Find other Recipes with the same slug
  const slugRegExp = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, 'i');

  // @ts-ignore
  const recipesWithSlug = await this.constructor.find({ slug: slugRegExp });

  if (recipesWithSlug.length) {
    this.slug = `${this.slug}-${recipesWithSlug.length + 1}`;
  }

  next();
});

export default model<IRecipe>('Recipe', recipeSchema);
