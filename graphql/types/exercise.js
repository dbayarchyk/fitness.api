import {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLList
} from 'graphql';

import { muscleType, muscleInputType } from './muscle';

export const exerciseType = new GraphQLObjectType({
  name: 'Exercise',
  description: 'Exercise api',
  fields: () => ({
    _id:            { type: GraphQLString },
    name:           { type: new GraphQLNonNull(GraphQLString) },
    avatarUrl:      { type: GraphQLString },
    photos:         { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) },
    muscules:       { type: new GraphQLList(muscleType) },
    description:    { type: GraphQLString },
    complexity:     { type: GraphQLInt },
    video:          { type: GraphQLString }
  })
});

export const exerciseInputType = new GraphQLInputObjectType({
  name: 'ExerciseInput',
  description: 'Insert Exercise',
  fields: () => ({
    _id:            { type: GraphQLString },
    name:           { type: new GraphQLNonNull(GraphQLString) },
    avatarUrl:      { type: GraphQLString },
    photos:         { type: new GraphQLList(GraphQLString) },
    muscules:       { type: new GraphQLList(muscleInputType) },
    description:    { type: GraphQLString },
    complexity:     { type: GraphQLInt },
    video:          { type: GraphQLString }
  })
});