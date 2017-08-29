import {
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLString
} from 'graphql';

import FoodPlanModel from '../../../models/foodPlan';
import { foodPlanType } from '../../types/foodPlan';

export default {
  type: new GraphQLList(foodPlanType),
  args: {
    query: {
      name: 'query',
      type: new GraphQLInputObjectType({
        name: 'FoodPlanQueryParams',
        description: 'Food plan query params',
        fields: () => ({
          name: { type: GraphQLString, defaultValue: '' }
        })
      })
    }
  },
  resolve(root, params, context) {
    if (!context.user) {
      throw new Error('You have not access');
    }

    const foods = FoodPlanModel.find({
      name: { '$regex': params.query.name, '$options': 'i' }
    }).populate('meals.foods.product').exec();

    if (!foods) {
      throw new Error('Error while fetching food plans...');
    }

    return foods;
  }
}
