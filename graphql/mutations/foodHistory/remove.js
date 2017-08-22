import {
  GraphQLID,
  GraphQLNonNull
} from 'graphql';

import FoodHistoryModel from '../../../models/foodHistory';
import { foodHistoryType } from '../../types/foodHistory';

export default {
  type: foodHistoryType,
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

    const removedFoodHistoryItem = FoodHistoryModel.findByIdAndRemove(params._id);
    
    if (!removedFoodHistoryItem) {
      throw new Error('Error removing of food history item');
    }

    return removedFoodHistoryItem;
  }
}
