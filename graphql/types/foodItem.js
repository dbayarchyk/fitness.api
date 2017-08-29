import {
  GraphQLInt,
  GraphQLString,
  GraphQLObjectType,
  GraphQLInputObjectType
} from 'graphql';

import { foodType } from './food';

export const foodItemType = new GraphQLObjectType({
  name: 'FoodItem',
  description: 'Foods',
  fields: () => ({
    product: { type: foodType },
    weight:  { type: GraphQLInt }
  })
});

export const foodItemInputType = new GraphQLInputObjectType({
  name: 'FoodItemInput',
  description: 'Foods input fro food history',
  fields: () => ({
    product: { type: GraphQLString },
    weight:  { type: GraphQLInt }
  })
});