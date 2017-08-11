import {
  GraphQLList,
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLString
} from 'graphql';
import { foodType } from '../../types/food';
import FoodModel from '../../../models/food';

export default {
  type: new GraphQLList(foodType),
  args: {
    query: {
      name: 'query',
      type: new GraphQLInputObjectType({
        name: 'FoodQueryParams',
        description: 'Food query params',
        fields: () => ({
          name:      { type: GraphQLString, defaultValue: '' },
          category:  { type: GraphQLString, defaultValue: '' }
        })
      })
    }
  },
  resolve(root, params, context) {
    if (!context.user) {
      throw new Error('You have not access');
    }

    const foods = FoodModel.find({
      name: { '$regex': params.query.name, '$options': 'i' } ,
      category: { '$regex': params.query.category, '$options': 'i' }
    }).exec();

    if (!foods) {
      throw new Error('Error while fetching foods...');
    }

    return foods;
  }
}
