import {
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLString
} from 'graphql';

import TrainingPlanModel from '../../../models/trainingPlan';
import { trainingPlanType } from '../../types/trainingPlan';

export default {
  type: new GraphQLList(trainingPlanType),
  args: {
    query: {
      name: 'query',
      type: new GraphQLInputObjectType({
        name: 'TrainingPlanQueryParams',
        description: 'Training plan query params',
        fields: () => ({
          name: { type: GraphQLString, defaultValue: '' }
        })
      })
    }
  },
  resolve(root, params, context) {
    if (!context.user) {
      throw new Error('You have not access');
    }

    const trainings = TrainingPlanModel.find({
      name: { '$regex': params.query ? params.query.name : '', '$options': 'i' }
    }).populate('meals.trainings.product').exec();

    if (!trainings) {
      throw new Error('Error while fetching training plans...');
    }

    return trainings;
  }
}
