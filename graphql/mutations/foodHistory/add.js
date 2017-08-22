import {
  GraphQLID,
  GraphQLNonNull
} from 'graphql';
import { foodHistoryInputType, foodHistoryType } from '../../types/foodHistory';
import UserModel from '../../../models/user';

import FoodHistoryModel from '../../../models/foodHistory';

export default {
  type: foodHistoryType,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(foodHistoryInputType)
    }
  },
  resolve(root, params, context) {
    if (!context.user) {
      throw new Error('You have not access');
    }

    const foodHistoryItem = new FoodHistoryModel(params.data);

    const newFoodHistoryItem = foodHistoryItem.save();

    if (!newFoodHistoryItem) {
      throw new Error('Error food history item');
    }

    return newFoodHistoryItem;
  }
}
