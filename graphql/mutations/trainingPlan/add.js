import {
  GraphQLNonNull
} from 'graphql';

import { trainingPlanType, trainingPlanInputType } from '../../types/trainingPlan';
import TrainingPlanModel from '../../../models/trainingPlan';

export default {
  type: trainingPlanType,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(trainingPlanInputType)
    }
  },
  resolve(root, params, context) {
    if (!context.user) {
      throw new Error('You have not access');
    }

    const trainingPlan = new TrainingPlanModel(params.data);

    const newTrainingPlan = trainingPlan.save();

    if (!newTrainingPlan) {
      throw new Error('Error adding training plan');
    }

    return newTrainingPlan;
  }
}
