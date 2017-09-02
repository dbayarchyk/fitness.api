import {
  GraphQLNonNull,
  GraphQLID
} from 'graphql';

import { trainingPlanType, trainingPlanInputType } from '../../types/trainingPlan';
import TrainingPlanModel from '../../../models/trainingPlan';

export default {
  type: trainingPlanType,
  args: {
    _id: {
      name: '_id',
      type: new GraphQLNonNull(GraphQLID)
    },
    data: {
      name: 'data',
      type: new GraphQLNonNull(trainingPlanInputType)
    }
  },
  resolve(root, params, context) {
    if (!context.user) {
      throw new Error('You have not access');
    }

    return TrainingPlanModel.findById(params._id).exec()
      .then(trainingPlan => {
        Object.assign(trainingPlan, { ...params.data });

        trainingPlan.save()
          .then(data => TrainingPlanModel.findById(params._id).exec())
          .catch(err => new Error('Could not update trainingPlan data ', err));
      });
  }
}
