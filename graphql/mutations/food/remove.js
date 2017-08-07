import {
  GraphQLNonNull,
  GraphQLID
} from 'graphql';

import { foodType } from '../../types/food';
import FoodModel from '../../../models/food';

export default {
  type: foodType,
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

    const removedFood = FoodModel.findByIdAndRemove(params._id);

    if (!removedFood) {
      throw new Error('Error removing food');
    }

    return removedFood;
  }
}
