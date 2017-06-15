import {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLID
} from 'graphql';

export const userType = new GraphQLObjectType({
  name: 'User',
  description: 'User api',
  fields: () => ({
    _id:       { type: new GraphQLNonNull(GraphQLID) },
    email:     { type: GraphQLString },
    name:      { type: GraphQLString },
    surname:   { type: GraphQLString },
    avatarUrl: { type: GraphQLString },
    age:       { type: GraphQLInt },
    weight:    { type: GraphQLInt }
  })
});

export const userInputType = new GraphQLInputObjectType({
  name: 'UserInput',
  description: 'Insert User',
  fields: () => ({
    email:     { type: GraphQLString },
    password:  { type: GraphQLString },
    name:      { type: GraphQLString },
    surname:   { type: GraphQLString },
    avatarUrl: { type: GraphQLString },
    age:       { type: GraphQLInt },
    weight:    { type: GraphQLInt }
  })
});
