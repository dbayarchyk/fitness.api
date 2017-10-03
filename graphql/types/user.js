import {
  GraphQLFloat,
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} from 'graphql';

import { foodHistoryType } from './foodHistory';
import { foodType } from './food';
import { foodPlanType } from './foodPlan';
import { trainingPlanType } from './trainingPlan';
 
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
    gender:        { type: GraphQLString },
    height:        { type: GraphQLInt },
    bodyMassIndex: { type: GraphQLInt },
    weight:        { type: GraphQLFloat },
    role:          { type: GraphQLString },
    createdAt:     { type: GraphQLString },
    updatedAt:     { type: GraphQLString },
    purpose:       { type: GraphQLString },
    foodPlan:      { type: foodPlanType },
    trainingPlan:  { type: trainingPlanType }
  })
});

export const userInputType = new GraphQLInputObjectType({
  name: 'UserInput',
  description: 'Insert User',
  fields: () => ({
    email:        { type: GraphQLString },
    password:     { type: GraphQLString },
    name:         { type: GraphQLString },
    surname:      { type: GraphQLString },
    avatarUrl:    { type: GraphQLString },
    age:          { type: GraphQLInt },
    gender:       { type: GraphQLString },
    height:       { type: GraphQLInt },
    weight:       { type: GraphQLFloat },
    purpose:      { type: GraphQLString },
    role:         { type: GraphQLString },
    foodPlan:     { type: GraphQLString },
    trainingPlan: { type: GraphQLString }
  })
});