import {
  GraphQLNonNull,
  GraphQLID
} from 'graphql';
import { userType } from '../../types/user';
import UserModel from '../../../models/user';

export default {
  type: userType,
  resolve(root, params, context) {
    if (!context.user) {
      return null;
    }

    return UserModel.findById(context.user._id)
      .populate({
        path: 'foodPlan',
        populate: { path: 'meals.foods.product' }
      })
      .populate({
        path: 'trainingPlan',
        populate: { path: 'trainings.exerciseAproaches.exercise' }
      })
      .exec();
  }
}