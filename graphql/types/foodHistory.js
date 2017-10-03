import {
  GraphQLFloat,
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} from 'graphql';

import { foodType } from './food';
import { nutrientsType, nutrientsInputType } from './nutrients';
import { foodItemType, foodItemInputType } from './foodItem';

export const foodHistoryType = new GraphQLObjectType({
  name: 'FoodHistory',
  description: 'Food History',
  fields: () => ({
    _id:       { type: GraphQLString },
    userId:    { type: GraphQLString },
    foods:     { type: new GraphQLList(foodItemType) },
    date:      { type: GraphQLString },
    nutrients: { type: nutrientsType },
    calorificValue: { type: new GraphQLNonNull(GraphQLFloat) }
  })
});

export const foodHistoryInputType = new GraphQLInputObjectType({
  name: 'FoodHistoryInput',
  description: 'Insert food to the history',
  fields: () => ({
    _id:    { type: GraphQLString },
    userId: { type: GraphQLString },
    foods:  { type: new GraphQLList(foodItemInputType) },
    date:   { type: GraphQLString },
    nutrients: { type: nutrientsInputType },
    calorificValue: { type: GraphQLFloat }
  })
});
