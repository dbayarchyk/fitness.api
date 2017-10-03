import {
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLString
} from 'graphql';

import MuscleModel from '../../../models/muscle';
import { muscleType } from '../../types/muscle';

export default {
  type: new GraphQLList(muscleType),
  args: {
    query: {
      name: 'query',
      type: new GraphQLInputObjectType({
        name: 'MuscleQueryParams',
        description: 'Muscle query params',
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

    const muscles = MuscleModel.find({
      name: { '$regex': params.query.name, '$options': 'i' }
    }).populate('muscles').exec();

    if (!muscles) {
      throw new Error('Error while fetching muscles...');
    }

    return muscles;
  }
}
