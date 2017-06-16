import {
  GraphQLNonNull,
  GraphQLID
} from 'graphql';

import { userType, userInputType } from '../../types/user';
import UserModel from '../../../models/user';

export default {
  type: userType,
  args: {
    _id: {
      name: '_id',
      type: new GraphQLNonNull(GraphQLID)
    },
    data: {
      name: 'data',
      type: new GraphQLNonNull(userInputType)
    }
  },
  resolve(root, params, context) {
    if (!context.user) {
      throw new Error('You have not access');
    }

    return UserModel.findByIdAndUpdate(params._id, { $set: { ...params.data }})
      .then(data => UserModel.findById(params._id).exec())
      .catch(err => new Error('Could not update user data ', err));
  }
}
