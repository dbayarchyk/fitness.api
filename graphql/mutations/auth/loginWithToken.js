import {
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';

import UserModel from '../../../models/user';
import { userType } from '../../types/user';

export default {
  type: userType,
  resolve(root, params, context) {
    if (!context.user) {
      throw new Error('Token is incorrect');
    }

    return UserModel.findOne({ _id: context.user._id }).exec();
  }
}
