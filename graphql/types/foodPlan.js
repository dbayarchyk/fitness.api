import {
  GraphQLFloat,
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLScalarType,
  GraphQLString
} from 'graphql';

import { foodType } from './food';
import { nutrientsType, nutrientsInputType } from './nutrients';
import { foodItemType, foodItemInputType } from './foodItem';

export const foodPlanType = new GraphQLObjectType({
  name: 'FoodPlan',
  description: 'Food Plan',
  fields: () => ({
    _id:            { type: GraphQLString },
    name:           { type: new GraphQLNonNull(GraphQLString) },
    avatarUrl:      { type: GraphQLString },
    meals:          { type: new GraphQLList(mealType) },
    nutrients:      { type: nutrientsType },
    calorificValue: { type: new GraphQLNonNull(GraphQLFloat) }
  })
});

export const foodPlanInputType = new GraphQLInputObjectType({
  name: 'FoodPlanInput',
  description: 'Insert food plan',
  fields: () => ({
    _id:            { type: GraphQLString },
    name:           { type: GraphQLString },
    avatarUrl:      { type: GraphQLString },
    meals:          { type: new GraphQLList(mealInputType) },
    nutrients:      { type: nutrientsInputType },
    calorificValue: { type: GraphQLFloat }
  })
});

const mealType = new GraphQLObjectType({
  name: 'Meal',
  description: 'Meal',
  fields: () => ({
    foods:     { type: new GraphQLList(foodItemType) },
    date:      { type: GraphQLString },
    calorificValue: { type: GraphQLFloat },
    nutrients: { type: nutrientsType }
  })
});

const mealInputType = new GraphQLInputObjectType({
  name: 'MealInput',
  description: 'Meal input',
  fields: () => ({
    foods:     { type: new GraphQLList(foodItemInputType) },
    date:      { type: GraphQLString },
    calorificValue: { type: GraphQLFloat },
    nutrients: { type: nutrientsInputType }
  })
});
