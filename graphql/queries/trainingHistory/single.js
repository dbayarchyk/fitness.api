import {
  GraphQLNonNull,
  GraphQLID
} from 'graphql';
import { trainingHistoryType } from '../../types/trainingHistory';
import TrainingHistoryModel from '../../../models/trainingHistory';

export default {
  type: trainingHistoryType,
  args: {
    _id: { name: '_id', type: new GraphQLNonNull(GraphQLID) }
  },
  resolve(root, params, context) {
    if (!context.user) {
      throw new Error('You have not access');
    }

    return TrainingHistoryModel.findById(params._id)
      .populate('exerciseAproaches.exercise')
      .exec();
  }
}