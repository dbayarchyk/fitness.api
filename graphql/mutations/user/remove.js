import {
  GraphQLNonNull,
  GraphQLID
} from 'graphql';

import { userType } from '../../types/user';
import UserModel from '../../../models/user';

export default {
  type: userType,
  args: {
    _id: {
      name: '_id',
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolve(root, params, context) {
    if (!context.user) {
      throw new Error('You have not access');
    }

    const removedUser = UserModel.findByIdAndRemove(params._id);

    if (!removedUser) {
      throw new Error('Error removing user');
    }

    return removedUser;
  }
}
