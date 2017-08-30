import {
  GraphQLNonNull,
  GraphQLID
} from 'graphql';
import { userType } from '../../types/user';
import UserModel from '../../../models/user';

export default {
  type: userType,
  args: {
    _id: { name: '_id', type: new GraphQLNonNull(GraphQLID) }
  },
  resolve(root, params, context) {
    if (!context.user) {
      throw new Error('You have not access');
    }

    return UserModel.findById(params._id)
      .populate({
        path: 'foodPlan',
        populate: { path: 'meals.foods.product' }
      })
      .exec();
  }
}
