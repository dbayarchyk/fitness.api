import {
  GraphQLNonNull,
  GraphQLID
} from 'graphql';

import { foodPlanType } from '../../types/foodPlan';
import FoodPlanModel from '../../../models/foodPlan';

export default {
  type: foodPlanType,
  args: {
    _id: {
      name: '_id',
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolve(root, params, context) {
    if (!context.user) {
      throw new Error('You have not access');
    }

    const removedFoodPlan = FoodPlanModel.findByIdAndRemove(params._id);

    if (!removedFoodPlan) {
      throw new Error('Error removing foodPlan');
    }

    return removedFoodPlan;
  }
}
