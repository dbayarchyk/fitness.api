import {
  GraphQLNonNull,
  GraphQLID
} from 'graphql';
import { trainingType } from '../../types/trainingPlan';
import UserModel from '../../../models/user';
import TrainingHistoryModel from '../../../models/trainingHistory';

import moment from 'moment';

export default {
  type: trainingType,
  args: {
    _id: { name: '_id', type: new GraphQLNonNull(GraphQLID) }
  },
  resolve(root, params, context) {
    if (!context.user) {
      throw new Error('You have not access');
    }

    return new Promise((resolve, reject) => {
      const userPromise = UserModel
        .findById(params._id)
        .populate({
          path: 'trainingPlan',
          populate: { path: 'trainings.exerciseAproaches.exercise' }
        })
        .exec();

      const now = moment().startOf('day');

      const trainingHistoryPromise = TrainingHistoryModel
        .find({ 
          userId: params._id,
          date: { 
            $gte: now,
          },
        }).exec()

      Promise.all([ userPromise, trainingHistoryPromise ])
        .then(([ user, trainingHistoryItems ]) => {
          
          let training = null;
          if (!trainingHistoryItems.length) {
            training = user.trainingPlan.trainings
              .find(training => training.date.getDay() === now.getDay());
          }

          resolve(training);
        })
        .catch(err => {
          console.log(err);
          reject('Error while fetching training...')
        });
    });
  }
}