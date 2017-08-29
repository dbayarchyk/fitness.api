import {
  GraphQLFloat,
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLScalarType,
  GraphQLString
} from 'graphql';

import { foodHistoryType } from './foodHistory';
import { foodType } from './food';
import { foodPlanType } from './foodPlan';
 
export const userType = new GraphQLObjectType({
  name: 'User',
  description: 'User api',
  fields: () => ({
    _id:           { type: GraphQLString },
    email:         { type: new GraphQLNonNull(GraphQLString) },
    name:          { type: GraphQLString },
    surname:       { type: GraphQLString },
    avatarUrl:     { type: GraphQLString },
    age:           { type: GraphQLInt },
    sex:           { type: GraphQLString },
    height:        { type: GraphQLInt },
    bodyMassIndex: { type: GraphQLInt },
    weight:        { type: GraphQLInt },
    role:          { type: GraphQLString },
    createdAt:     { type: GraphQLString },
    updatedAt:     { type: GraphQLString },
    weightHistory: { type: new GraphQLList(new GraphQLObjectType({
        name: 'WeightHistory',
        description: 'Weight History',
        fields: () => ({
          _id:      { type: GraphQLString },
          date:     { type: GraphQLString },
          weight:   { type: GraphQLInt }
        })
      }))
    },
    foodPlan:      { type: foodPlanType }
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
    sex:       { type: GraphQLString },
    height:    { type: GraphQLInt },
    weight:    { type: GraphQLInt },
    role:      { type: GraphQLString },
    foodPlan:  { type: GraphQLString }
  })
});
