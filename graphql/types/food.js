import {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat
} from 'graphql';

export const foodType = new GraphQLObjectType({
  name: 'Food',
  description: 'Food api',
  fields: () => ({
    _id:            { type: GraphQLString },
    name:           { type: new GraphQLNonNull(GraphQLString) },
    avatarUrl:      { type: GraphQLString },
    category:       { type: new GraphQLNonNull(GraphQLString) },
    calorificValue: { type: new GraphQLNonNull(GraphQLFloat) },
    proteins:       { type: new GraphQLNonNull(GraphQLFloat) },
    carbohydrates:  { type: new GraphQLNonNull(GraphQLFloat) },
    fats:           { type: new GraphQLNonNull(GraphQLFloat) },
  })
});

export const foodInputType = new GraphQLInputObjectType({
  name: 'FoodInput',
  description: 'Insert Food',
  fields: () => ({
    _id:            { type: GraphQLString },
    name:           { type: new GraphQLNonNull(GraphQLString) },
    avatarUrl:      { type: GraphQLString },
    category:       { type: new GraphQLNonNull(GraphQLString) },
    calorificValue: { type: new GraphQLNonNull(GraphQLFloat) },
    proteins:       { type: new GraphQLNonNull(GraphQLFloat) },
    carbohydrates:  { type: new GraphQLNonNull(GraphQLFloat) },
    fats:           { type: new GraphQLNonNull(GraphQLFloat) },
  })
});
