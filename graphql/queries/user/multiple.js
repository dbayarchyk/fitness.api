import {
  GraphQLList,
  GraphQLID
} from 'graphql';
import { userType } from '../../types/user';
import UserModel from '../../../models/user';

export default {
  type: new GraphQLList(userType),
  resolve(root, params, context) {
    // if (!context.user) {
    //   throw new Error('You have not access');
    // }

    const users = UserModel.find().exec();

    if (!users) {
      throw new Error('Error while fetching users...');
    }

    return users;
  }
}
