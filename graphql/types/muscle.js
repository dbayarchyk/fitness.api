import {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';

export const muscleType = new GraphQLObjectType({
  name: 'Muscle',
  description: 'Muscle api',
  fields: () => ({
    _id:            { type: new GraphQLNonNull(GraphQLString) },
    name:           { type: new GraphQLNonNull(GraphQLString) },
    group:          { type: new GraphQLNonNull(GraphQLString) }
  })
});

export const muscleInputType = new GraphQLInputObjectType({
  name: 'MuscleInput',
  description: 'Insert Muscle',
  fields: () => ({
    _id:            { type: GraphQLString },
    name:           { type: GraphQLString },
    group:          { type: GraphQLString },
  })
});