import {
  GraphQLID,
  GraphQLNonNull
} from 'graphql';
import { foodHistoryInputType, foodHistoryType } from '../../types/foodHistory';

import FoodHistoryModel from '../../../models/foodHistory';

export default {
  type: foodHistoryType,
  args: {
    _id: {
      name: '_id',
      type: new GraphQLNonNull(GraphQLID)
    },
    data: {
      name: 'data',
      type: new GraphQLNonNull(foodHistoryInputType)
    }
  },
  resolve(root, params, context) {
    if (!context.user) {
      throw new Error('You have not access');
    }

    return FoodHistoryModel.findById(params._id).exec()
      .then(foodHistoryItem => {
        if (!foodHistoryItem) {
          throw new Error('Food history item with this _id does not exist');
        }

        Object.assign(foodHistoryItem, { ...params.data });

        return foodHistoryItem.save();
      });
  }
}
