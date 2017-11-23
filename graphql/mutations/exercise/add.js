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
    if (!context.user) {
      throw new Error('You have not access');
    }

    const exercise = new ExerciseModel(params.data);

    const newExercise = exercise.save();

    if (!newExercise) {
      throw new Error('Error adding exercise');
    }

    return new Promise((resolve, reject) => {
      newExercise
        .then((savedExercise) => {
          ExerciseModel.populate(savedExercise, { path: 'muscules' })
            .then(populatedExercise => resolve(populatedExercise))
            .catch(err => reject(new Error('Could not populate exercise data ', err)))
        })
        .catch(err => reject(new Error('Could not create exercise ', err)));
    });
  }
}
