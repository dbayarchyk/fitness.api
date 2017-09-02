import {
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLString
} from 'graphql';

import ExerciseModel from '../../../models/exercise';
import { exerciseType } from '../../types/exercise';

export default {
  type: new GraphQLList(exerciseType),
  args: {
    query: {
      name: 'query',
      type: new GraphQLInputObjectType({
        name: 'ExerciseQueryParams',
        description: 'Exercise query params',
        fields: () => ({
          name:      { type: GraphQLString, defaultValue: '' }
        })
      }),
      defaultValue: {
        name: ''
      }
    }
  },
  resolve(root, params, context) {
    if (!context.user) {
      throw new Error('You have not access');
    }

    const exercises = ExerciseModel.find({
      name: { '$regex': params.query.name, '$options': 'i' }
    }).exec();

    if (!exercises) {
      throw new Error('Error while fetching exercises...');
    }

    return exercises;
  }
}
