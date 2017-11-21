import {
  GraphQLNonNull,
  GraphQLID
} from 'graphql';

import { muscleType } from '../../types/muscle';
import MuscleModel from '../../../models/muscle';

export default {
  type: muscleType,
  args: {
    _id: {
      name: '_id',
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolve(root, params, context) {
    if (!context.user) {
      throw new Error('You have not access');
    }

    const removedMuscle = MuscleModel.findByIdAndRemove(params._id);

    if (!removedMuscle) {
      throw new Error('Error removing muscle');
    }

    return removedMuscle;
  }
}
