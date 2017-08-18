import {
  GraphQLID,
  GraphQLNonNull
} from 'graphql';

import UserModel from '../../../../models/user';
import { foodHistoryType } from '../../../types/foodHistory';

export default {
  type: foodHistoryType,
  args: {
    userId: {
      name: 'userId',
      type: new GraphQLNonNull(GraphQLID)
    },
    itemId: {
      name: 'itemId',
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolve(root, params, context) {
    if (!context.user) {
      throw new Error('You have not access');
    }

    return new Promise((resolve, reject) => {
      UserModel.findById(params.userId).exec()
        .then(user => {
          const foodHistoryItem = user.foodHistory.find(foodHistoryItem => foodHistoryItem._id === params.itemId);

          user.foodHistory = user.foodHistory.filter(foodHistoryItem => foodHistoryItem._id !== params.itemId);

          user.save()
            .then(data => resolve(foodHistoryItem))
            .catch(err => reject(new Error('Error removing user', err)));
        });
    });
  }
}
