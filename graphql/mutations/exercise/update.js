import {
  GraphQLNonNull,
  GraphQLID
} from 'graphql';

import { exerciseType, exerciseInputType } from '../../types/exercise';
import ExerciseModel from '../../../models/exercise';
import { Promise } from 'mongoose';

export default {
  type: exerciseType,
  args: {
    _id: {
      name: '_id',
      type: new GraphQLNonNull(GraphQLID)
    },
    data: {
      name: 'data',
      type: new GraphQLNonNull(exerciseInputType)
    }
  },
  resolve(root, params, context) {
    if (!context.user) {
      throw new Error('You have not access');
    }

    const updatingExercise = ExerciseModel.findById(params._id).exec();

    if (!updatingExercise) {
      throw new Error('Error updating exercise');
    }

    return new Promise((resolve, reject) => {
      updatingExercise
        .then((exercise) => {
          Object.assign(exercise, { ...params.data });

          exercise.save()
            .then((updatedExercise) => {
              ExerciseModel.populate(updatedExercise, { path: 'muscules' })
                .then(populatedExercise => resolve(populatedExercise))
                .catch(err => reject(new Error('Could not populate exercise data ', err)));
            })
            .catch(err => reject(new Error('Could not update exercise data ', err)));
        })
        .catch(err => reject(new Error('Exercise with this _id is not found ', err)));
    });

    // TODO: Use it when mongoose will support pre findByIdAndUpdate method.
  }
}
