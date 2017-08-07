import {
  GraphQLList,
  GraphQLID
} from 'graphql';
import { foodType } from '../../types/food';
import FoodModel from '../../../models/food';

export default {
  type: new GraphQLList(foodType),
  resolve(root, params, context) {
    if (!context.user) {
      throw new Error('You have not access');
    }

    const users = FoodModel.find().exec();

    if (!foods) {
      throw new Error('Error while fetching foods...');
    }

    return foods;
  }
}
