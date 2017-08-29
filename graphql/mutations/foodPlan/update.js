import {
  GraphQLNonNull,
  GraphQLID
} from 'graphql';

import { foodPlanType, foodPlanInputType } from '../../types/foodPlan';
import FoodPlanModel from '../../../models/foodPlan';

export default {
  type: foodPlanType,
  args: {
    _id: {
      name: '_id',
      type: new GraphQLNonNull(GraphQLID)
    },
    data: {
      name: 'data',
      type: new GraphQLNonNull(foodPlanInputType)
    }
  },
  resolve(root, params, context) {
    if (!context.user) {
      throw new Error('You have not access');
    }

    return FoodPlanModel.findById(params._id).exec()
      .then(foodPlan => {
        Object.assign(foodPlan, { ...params.data });

        foodPlan.save()
          .then(data => FoodPlanModel.findById(params._id).exec())
          .catch(err => new Error('Could not update foodPlan data ', err));
      });
  }
}
