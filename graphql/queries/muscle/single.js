import {
  GraphQLID,
  GraphQLNonNull
} from 'graphql';

import MuscleModel from '../../../models/muscle';
import { muscleType } from '../../types/muscle';

export default {
  type: muscleType,
  args: {
    _id: { name: '_id', type: new GraphQLNonNull(GraphQLID) }
  },
  resolve(root, params, context) {
    if (!context.user) {
      throw new Error('You have not access');
    }

    return MuscleModel.findById(params._id).populate('muscles').exec();
  }
}
