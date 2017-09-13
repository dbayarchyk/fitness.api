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
    date:              { type: GraphQLString },
    exerciseAproaches: { type: new GraphQLList(exerciseAproacheType) },
    trainingIdInPlan:  { type: GraphQLString }
  })
});

export const trainingHistoryInputType = new GraphQLInputObjectType({
  name: 'TrainingHistoryInput',
  description: 'Insert training to the history',
  fields: () => ({
    _id:               { type: GraphQLString },
    userId:            { type: new GraphQLNonNull(GraphQLString) },
    date:              { type: GraphQLString },
    exerciseAproaches: { type: new GraphQLList(exerciseAproacheInputType) },
    trainingIdInPlan:  { type: GraphQLString }
  })
});
