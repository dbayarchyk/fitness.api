import {
  GraphQLID,
  GraphQLNonNull
} from 'graphql';
import { trainingHistoryInputType, trainingHistoryType } from '../../types/trainingHistory';

import TrainingHistoryModel from '../../../models/trainingHistory';

export default {
  type: trainingHistoryType,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(trainingHistoryInputType)
    }
  },
  resolve(root, params, context) {
    if (!context.user) {
      throw new Error('You have not access');
    }

    const trainingHistoryItem = new TrainingHistoryModel(params.data);

    const newTrainingHistoryItem = trainingHistoryItem.save();

    if (!newTrainingHistoryItem) {
      throw new Error('Error training history item');
    }

    return newTrainingHistoryItem;
  }
}
