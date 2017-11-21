import {
  GraphQLNonNull
} from 'graphql';

import { muscleType, muscleInputType } from '../../types/muscle';
import MuscleModel from '../../../models/muscle';

export default {
  type: muscleType,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(muscleInputType)
    }
  },
  resolve(root, params, context) {
    if (!context.user) {
      throw new Error('You have not access');
    }

    const muscle = new MuscleModel(params.data);

    const newMuscle = muscle.save();

    if (!newMuscle) {
      throw new Error('Error adding muscle');
    }

    return newMuscle;
  }
}
