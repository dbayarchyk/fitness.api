import {
  GraphQLNonNull,
  GraphQLID
} from 'graphql';

import { exerciseType } from '../../types/exercise';
import ExerciseModel from '../../../models/exercise';
import { Error } from 'mongoose';

export default {
  type: exerciseType,
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

    const removedExercise = ExerciseModel.findByIdAndRemove(params._id);

    if (!removedExercise) {
      throw new Error('Error removing exercise');
    }

    return new Promise((resolve, reject) => {
      removedExercise
        .then(exercise => {
          ExerciseModel.populate(exercise, { path: '' })
            .then(populatedExercise => resolve(populatedExercise))
            .catch(err => reject(new Error('Could not populate exericse data ', err)));
        })
        .catch(err => reject(new Error('Could not remove exericse ', err)));
    })
  }
}
