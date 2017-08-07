import {
  GraphQLNonNull
} from 'graphql';

import { foodType, foodInputType } from '../../types/food';
import FoodModel from '../../../models/food';

export default {
  type: foodType,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(foodInputType)
    }
  },
  resolve(root, params, context) {
    const food = new FoodModel(params.data);

    const newFood = food.save();

    if (!newFood) {
      throw new Error('Error adding food');
    }

    return newFood;
  }
}
