import {
  GraphQLNonNull,
  GraphQLID
} from 'graphql';

import { trainingPlanType } from '../../types/trainingPlan';
import TrainingPlanModel from '../../../models/trainingPlan';

export default {
  type: trainingPlanType,
  args: {
    _id: { name: '_id', type: new GraphQLNonNull(GraphQLID) }
  },
  resolve(root, params, context) {
    if (!context.user) {
      throw new Error('You have not access');
    }

    return TrainingPlanModel.findById(params._id).populate('trainings.exerciseAproaches.exercise').exec();
  }
}
