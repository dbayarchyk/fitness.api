import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLFloat,
} from 'graphql';

import { nutrientsType } from './nutrients';

export const dailyNutritionRateType = new GraphQLObjectType({
  name: 'DailyNutritionRate',
  description: 'DailyNutritionRate api',
  fields: () => ({
    calorificValue: { type: new GraphQLNonNull(GraphQLFloat) },
    nutrients: { type: nutrientsType }
  })
});