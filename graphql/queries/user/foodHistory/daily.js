import {
  GraphQLNonNull,
  GraphQLID,
  GraphQLList
} from 'graphql';
import { foodHistoryType } from '../../../types/foodHistory';
import UserModel from '../../../../models/user';

export default {
  type: new GraphQLList(foodHistoryType),
  args: {
    userId: { name: 'userId', type: new GraphQLNonNull(GraphQLID) }
  },
  resolve(root, params, context) {
    if (!context.user) {
      throw new Error('You have not access');
    }

    return new Promise((resolve, reject) => {
      UserModel.findById(params.userID).populate('foodHistory.foods.food').exec()
        .then(user => {
          const now = new Date();
          const foodHistory = user.foodHistory.filter(
            foodHistoryItem => foodHistoryItem.date.getDate() === now.getDate()
                               && foodHistoryItem.date.getMonth() === now.getMonth()
                               && foodHistoryItem.date.getFullYear() === now.getFullYear()
          );
          console.log(user.foodHistory);
          console.log(foodHistory);
          resolve(foodHistory)
        });
    });
  }
}
