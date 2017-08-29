import {
  GraphQLNonNull
} from 'graphql';

import { exerciseType, exerciseInputType } from '../../types/exercise';
import ExerciseModel from '../../../models/exercise';

export default {
  type: exerciseType,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(exerciseInputType)
    }
  },
  resolve(root, params, context) {
    const exercise = new ExerciseModel(params.data);

    const newExercise = exercise.save();

    if (!newExercise) {
      throw new Error('Error adding exercise');
    }

    return newExercise;
  }
}
