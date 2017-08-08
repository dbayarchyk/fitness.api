import {
  GraphQLNonNull,
  GraphQLID
} from 'graphql';

import { foodHistoryType, foodHistoryInputType } from '../../../types/foodHistory';
import UserModel from '../../../../models/user';

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

    return new Promise((resolve, reject) => {
      UserModel.findById(params._id).populate('').populate('foodHistory.foods.food').exec()
        .then(user => {
          const foodHistoryItem = user.foodHistory.find(foodHistoryItem => params._id === foodHistoryItem._id);

          Object.assign(foodHistoryItem, { ...params.data });

          foodHistoryItem.foods.forEach((food, foodIndex) => {
            foodHistoryItem.calorificValue += food.calorificValue * foodHistoryItem.foods[foodIndex].weight / 100;
            foodHistoryItem.nutrients.proteins += food.proteins * foodHistoryItem.foods[foodIndex].weight / 100;
            foodHistoryItem.nutrients.carbohydrates += food.carbohydrates * foodHistoryItem.foods[foodIndex].weight / 100;
            foodHistoryItem.nutrients.fats += food.fats * foodHistoryItem.foods[foodIndex].weight / 100;
          });

          return user.save()
            .then(data => {
              UserModel.findById(user._id).populate('foodHistory.foods.food').exec()
                .then(user => resolve(user.foodHistory.find(foodHistoryItem => params._id === foodHistoryItem._id)))
            })
            .catch(err => new Error('Could not update user data ', err));
        })
        .catch(err => new Error('Could not update user data ', err));
    });
  }
}
