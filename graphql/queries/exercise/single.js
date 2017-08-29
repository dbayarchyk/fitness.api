import {
  GraphQLID,
  GraphQLNonNull
} from 'graphql';

import ExerciseModel from '../../../models/exercise';
import { exerciseType } from '../../types/exercise';

export default {
  type: exerciseType,
  args: {
    _id: { name: '_id', type: new GraphQLNonNull(GraphQLID) }
  },
  resolve(root, params, context) {
    if (!context.user) {
      throw new Error('You have not access');
    }

    return ExerciseModel.findById(params._id).exec();
  }
}
