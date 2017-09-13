import {
  GraphQLList,
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLString
} from 'graphql';
import { trainingHistoryType } from '../../types/trainingHistory';
import TrainingHistoryModel from '../../../models/trainingHistory';

export default {
  type: new GraphQLList(trainingHistoryType),
  args: {
    query: {
      name: 'query',
      type: new GraphQLInputObjectType({
        name: 'TrainingHistoryQueryParams',
        description: 'Training history query params',
        fields: () => ({
          userId: { type: GraphQLID, defaultValue: '' }
        })
      }),
      defaultValue: {
        userId: ''
      }
    }
  },
  resolve(root, params, context) {
    if (!context.user) {
      throw new Error('You have not access');
    }

    const trainingHistoryItems = TrainingHistoryModel.find({
      userId: params.query ? params.query.userId : ''
    }).populate('exerciseAproaches.exercise').exec();

    if (!trainingHistoryItems) {
      throw new Error('Error while fetching trainingHistoryItems...');
    }

    return trainingHistoryItems;
  }
}
