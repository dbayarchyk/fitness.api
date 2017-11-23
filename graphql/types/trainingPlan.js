import {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLList
} from 'graphql';

import { exerciseType, exerciseInputType } from './exercise';

export const trainingPlanType = new GraphQLObjectType({
  name: 'TrainingPlan',
  description: 'TrainingPlan api',
  fields: () => ({
    _id:        { type: GraphQLString },
    name:       { type: new GraphQLNonNull(GraphQLString) },
    avatarUrl:  { type: GraphQLString },
    photos:     { type: new GraphQLList(GraphQLString) },
    gender:        { type: GraphQLString },
    complexity: { type: GraphQLFloat },
    trainings:  { type: new GraphQLList(trainingType) }
  })
});

export const trainingPlanInputType = new GraphQLInputObjectType({
  name: 'TrainingPlanInput',
  description: 'Insert TrainingPlan',
  fields: () => ({
    _id:        { type: GraphQLString },
    name:       { type: new GraphQLNonNull(GraphQLString) },
    avatarUrl:  { type: GraphQLString },
    photos:     { type: new GraphQLList(GraphQLString) },
    gender:     { type: GraphQLString },
    complexity: { type: GraphQLFloat },
    trainings:  { type: new GraphQLList(trainingInputType) }
  })
});

export const trainingType = new GraphQLObjectType({
  name: 'Training',
  description: 'Training api',
  fields: () => ({
    _id:               { type: GraphQLString },
    date:              { type: GraphQLString },
    exerciseAproaches: { type: new GraphQLList(exerciseAproacheType) }
  })
});

const trainingInputType = new GraphQLInputObjectType({
  name: 'TrainingInput',
  description: 'Insert Training',
  fields: () => ({
    _id:               { type: GraphQLString },
    date:              { type: GraphQLString },
    exerciseAproaches: { type: new GraphQLList(exerciseAproacheInputType) } 
  })
});

export const exerciseAproacheType = new GraphQLObjectType({
  name: 'ExerciseAproache',
  description: 'ExerciseAproache api',
  fields: () => ({
    _id:      { type: GraphQLString },
    exercise: { type: exerciseType },
    count:    { type: GraphQLInt }
  })
});

export const exerciseAproacheInputType = new GraphQLInputObjectType({
  name: 'ExerciseAproacheInput',
  description: 'Insert ExerciseAproache',
  fields: () => ({
    _id:      { type: GraphQLString },
    exercise: { type: GraphQLString },
    count:    { type: GraphQLInt }
  })
});
