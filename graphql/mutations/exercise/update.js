import {
  GraphQLNonNull,
  GraphQLID
} from 'graphql';

import { exerciseType, exerciseInputType } from '../../types/exercise';
import ExerciseModel from '../../../models/exercise';

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
    if (!context.exercise) {
      throw new Error('You have not access');
    }

    return ExerciseModel.findById(params._id).exec()
      .then(exercise => {
        Object.assign(exercise, { ...params.data });

        return exercise.save()
          .then(data => ExerciseModel.findById(params._id).populate('muscles').exec())
          .catch(err => new Error('Could not update exercise data ', err));
      });

    // TODO: Use it when mongoose will support pre findByIdAndUpdate method.
    // return ExerciseModel.findByIdAndUpdate(params._id, { $set: { ...params.data }})
    //   .then(data => ExerciseModel.findById(params._id).exec())
    //   .catch(err => new Error('Could not update exercise data ', err));
  }
}
