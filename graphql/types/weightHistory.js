import {
  GraphQLFloat,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} from 'graphql';

export const weightHistoryType = new GraphQLObjectType({
  name: 'WeightHistory',
  description: 'Weight History',
  fields: () => ({
    _id:    { type: new GraphQLNonNull(GraphQLString) },
    userId: { type: new GraphQLNonNull(GraphQLString) },
    weight: { type: new GraphQLNonNull(GraphQLFloat) },
    date:   { type: GraphQLString },
  })
});

export const weightHistoryInputType = new GraphQLInputObjectType({
  name: 'WeightHistoryInput',
  description: 'Insert weight to the history',
  fields: () => ({
    _id:    { type: GraphQLString },
    userId: { type: new GraphQLNonNull(GraphQLString) },
    weight: { type: new GraphQLNonNull(GraphQLFloat) },
    date:   { type: GraphQLString },
  })
});