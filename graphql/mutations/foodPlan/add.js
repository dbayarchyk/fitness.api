import {
  GraphQLNonNull
} from 'graphql';

import { foodPlanType, foodPlanInputType } from '../../types/foodPlan';
import FoodPlanModel from '../../../models/foodPlan';

export default {
  type: foodPlanType,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(foodPlanInputType)
    }
  },
  resolve(root, params, context) {
    if (!context.user) {
      throw new Error('You have not access');
    }

    const foodPlan = new FoodPlanModel(params.data);

    const newFoodPlan = foodPlan.save();

    if (!newFoodPlan) {
      throw new Error('Error adding food plan');
    }

    return newFoodPlan;
  }
}
