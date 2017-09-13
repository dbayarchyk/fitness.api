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
          userId: { type: GraphQLString, defaultValue: '' }
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
      userId: { '$regex': params.query ? params.query.userId : '', '$options': 'i' }
    }).populate('exerciseAproaches.exercise').exec();

    if (!trainingHistoryItems) {
      throw new Error('Error while fetching trainingHistoryItems...');
    }

    return trainingHistoryItems;
  }
}
