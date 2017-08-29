import {
  GraphQLNonNull,
  GraphQLID
} from 'graphql';

import { exerciseType } from '../../types/exercise';
import ExerciseModel from '../../../models/exercise';

export default {
  type: exerciseType,
  args: {
    _id: {
      name: '_id',
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolve(root, params, context) {
    if (!context.exercise) {
      throw new Error('You have not access');
    }

    const removedExercise = ExerciseModel.findByIdAndRemove(params._id);

    if (!removedExercise) {
      throw new Error('Error removing exercise');
    }

    return removedExercise;
  }
}
