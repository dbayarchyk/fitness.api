import {
  GraphQLNonNull,
  GraphQLID
} from 'graphql';
import { trainingType } from '../../types/trainingPlan';
import UserModel from '../../../models/user';
import TrainingHistoryModel from '../../../models/trainingHistory';

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

      const trainingHistorypromise = TrainingHistoryModel
        .find({ userId:  params._id }).exec()

      Promise.all([ userPromise, trainingHistorypromise ])
        .then(responses => {
          const user = responses[0];
          const trainingHistoryItems = responses[1];

          const now = new Date();
          
          const training = user.trainingPlan.trainings
            .find(training => 
              training.date.getDay() === now.getDay() && !trainingHistoryItems.find(
                trainingHistoryItem => {
                  // TODO: Compare ids in another way.
                  return trainingHistoryItem.trainingIdInPlan.$oid === training._id.$oid
                }
              )
            );

          resolve(training);
        })
        .catch(err => {
          console.log(err);
          reject('Error while fetching training...')
        });
    });
  }
}