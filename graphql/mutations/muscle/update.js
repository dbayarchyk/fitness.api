import {
  GraphQLNonNull,
  GraphQLID
} from 'graphql';

import { muscleType, muscleInputType } from '../../types/muscle';
import MuscleModel from '../../../models/muscle';

export default {
  type: muscleType,
  args: {
    _id: {
      name: '_id',
      type: new GraphQLNonNull(GraphQLID)
    },
    data: {
      name: 'data',
      type: new GraphQLNonNull(muscleInputType)
    }
  },
  resolve(root, params, context) {
    if (!context.user) {
      throw new Error('You have not access');
    }

    return MuscleModel.findById(params._id).exec()
      .then(muscle => {
        Object.assign(muscle, { ...params.data });

        return muscle.save()
          .then(data => MuscleModel.findById(params._id).exec())
          .catch(err => new Error('Could not update muscle data ', err));
      });

    // TODO: Use it when mongoose will support pre findByIdAndUpdate method.
    // return MuscleModel.findByIdAndUpdate(params._id, { $set: { ...params.data }})
    //   .then(data => MuscleModel.findById(params._id).exec())
    //   .catch(err => new Error('Could not update muscle data ', err));
  }
}
