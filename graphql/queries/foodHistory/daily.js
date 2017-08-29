import {
  GraphQLNonNull,
  GraphQLID,
  GraphQLList
} from 'graphql';
import { foodHistoryType } from '../../types/foodHistory';
import FoodHistoryModel from '../../../models/foodHistory';

export default {
  type: new GraphQLList(foodHistoryType),
  args: {
    userId: { name: 'userId', type: new GraphQLNonNull(GraphQLID) }
  },
  resolve(root, params, context) {
    if (!context.user) {
      throw new Error('You have not access');
    }

    const foodHistory = new Promise((resolve, reject) => {
      FoodHistoryModel.find({ userId: params.userId }).populate('foods.product').exec()
        .then(history => {
          const now = new Date();
          const foodHistory = history.filter(
            historyItem => historyItem.date.getDate() === now.getDate()
                                && historyItem.date.getMonth() === now.getMonth()
                                && historyItem.date.getFullYear() === now.getFullYear()
          );

          resolve(foodHistory);
        })
        .catch(err => reject(new Error('Error while fetching daily user food history...', err)));
    });

    if (!foodHistory) {
      throw new Error('Error while fetching daily user food history...');
    }

    return foodHistory;
  }
}
