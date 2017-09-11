import {
  GraphQLNonNull,
  GraphQLID
} from 'graphql';
import { trainingType } from '../../types/trainingPlan';
import UserModel from '../../../models/user';

export default {
  type: trainingType,
  args: {
    _id: { name: '_id', type: new GraphQLNonNull(GraphQLID) }
  },
  resolve(root, params, context) {
    // if (!context.user) {
    //   throw new Error('You have not access');
    // }

    return new Promise((resolve, reject) => {
      UserModel.findById(params._id)
        .populate({
          path: 'trainingPlan',
          populate: { path: 'trainings.exerciseAproaches.exercise' }
        })
        .exec()
        .then(user => {
          const now = new Date();

          const training = user.trainingPlan.trainings
            .find(training => training.date.getDay() === now.getDay());

          resolve(training);
        })
        .catch(err => reject('Error while fetching users...'))
    });
  }
}