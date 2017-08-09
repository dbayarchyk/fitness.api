import {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLScalarType,
  GraphQLList,
  GraphQLFloat
} from 'graphql';

import { foodType } from './food';

export const foodHistoryType = new GraphQLObjectType({
  name: 'FoodHistory',
  description: 'Food History',
  fields: () => ({
    _id:       { type: GraphQLString },
    foods:     { type: new GraphQLList(foodItemType) },
    date:      { type: GraphQLString },
    nutrients: { type: new GraphQLObjectType({
        name: 'Nutrients',
        description: 'Nutrients',
        fields: () => ({
          proteins:       { type: new GraphQLNonNull(GraphQLFloat) },
          carbohydrates:  { type: new GraphQLNonNull(GraphQLFloat) },
          fats:           { type: new GraphQLNonNull(GraphQLFloat) },
        })
      })
    },
    calorificValue: { type: new GraphQLNonNull(GraphQLFloat) }
  })
});

export const foodHistoryInputType = new GraphQLInputObjectType({
  name: 'FoodHistoryInput',
  description: 'Insert food to the history',
  fields: () => ({
    _id:   { type: GraphQLString },
    foods: { type: new GraphQLList(foodItemInputType) },
    date:  { type: GraphQLString },
  })
});

const foodItemType = new GraphQLObjectType({
  name: 'FoodItem',
  description: 'Foods',
  fields: () => ({
    food:   { type: foodType },
    weight: { type: GraphQLInt }
  })
});

const foodItemInputType = new GraphQLInputObjectType({
  name: 'FoodItemInput',
  description: 'Foods input fro food history',
  fields: () => ({
    food:   { type: GraphQLString },
    weight: { type: GraphQLInt }
  })
});
