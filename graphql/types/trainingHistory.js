import {
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} from 'graphql';

import { exerciseAproacheType, exerciseAproacheInputType } from './trainingPlan';

export const trainingHistoryType = new GraphQLObjectType({
  name: 'TrainingHistory',
  description: 'Training History',
  fields: () => ({
    _id:               { type: GraphQLString },
    userId:            { type: GraphQLString },
    exerciseAproaches: { type: new GraphQLList(exerciseAproacheType) }
  })
});

export const trainingHistoryInputType = new GraphQLInputObjectType({
  name: 'TrainingHistoryInput',
  description: 'Insert training to the history',
  fields: () => ({
    _id:               { type: GraphQLString },
    userId:            { type: new GraphQLNonNull(GraphQLString) },
    exerciseAproaches: { type: new GraphQLList(exerciseAproacheInputType) }
  })
});
