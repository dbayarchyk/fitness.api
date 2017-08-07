import {
  GraphQLNonNull,
  GraphQLID
} from 'graphql';

import { foodType, foodInputType } from '../../types/food';
import FoodModel from '../../../models/food';

export default {
  type: foodType,
  args: {
    _id: {
      name: '_id',
      type: new GraphQLNonNull(GraphQLID)
    },
    data: {
      name: 'data',
      type: new GraphQLNonNull(foodInputType)
    }
  },
  resolve(root, params, context) {
    if (!context.user) {
      throw new Error('You have not access');
    }

    return FoodModel.findById(params._id).exec()
      .then(food => {
        Object.assign(food, { ...params.data });

        food.save()
          .then(data => FoodModel.findById(params._id).exec())
          .catch(err => new Error('Could not update food data ', err));
      });

    // TODO: Use it when mongoose will support pre findByIdAndUpdate method.
    // return FoodModel.findByIdAndUpdate(params._id, { $set: { ...params.data }})
    //   .then(data => FoodModel.findById(params._id).exec())
    //   .catch(err => new Error('Could not update food data ', err));
  }
}
