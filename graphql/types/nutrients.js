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


export const nutrientsType = new GraphQLObjectType({
  name: 'Nutrients',
  description: 'Nutrients',
  fields: () => ({
    proteins:       { type: new GraphQLNonNull(GraphQLFloat) },
    carbohydrates:  { type: new GraphQLNonNull(GraphQLFloat) },
    fats:           { type: new GraphQLNonNull(GraphQLFloat) },
  })
});

export const nutrientsInputType = new GraphQLInputObjectType({
  name: 'NutrientsInput',
  description: 'Nutrients input',
  fields: () => ({
    proteins:       { type: GraphQLFloat },
    carbohydrates:  { type: GraphQLFloat },
    fats:           { type: GraphQLFloat },
  })
});