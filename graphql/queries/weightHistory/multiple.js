import {
  GraphQLList,
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLString
} from 'graphql';
import { weightHistoryType } from '../../types/weightHistory';
import WeightHistoryModel from '../../../models/weightHistory';

export default {
  type: new GraphQLList(weightHistoryType),
  args: {
    query: {
      name: 'query',
      type: new GraphQLInputObjectType({
        name: 'WeightHistoryQueryParams',
        description: 'Weight history query params',
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

    const weightHistoryItems = WeightHistoryModel.find({
      userId: params.query ? params.query.userId : ''
    }).populate('exerciseAproaches.exercise').exec();

    if (!weightHistoryItems) {
      throw new Error('Error while fetching weightHistoryItems...');
    }

    return weightHistoryItems;
  }
}
