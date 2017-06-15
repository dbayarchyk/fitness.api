import {
  GraphQLNonNull,
  GraphQLID
} from 'graphql';

import { userType, userInputType } from '../../types/user';
import UserModel from '../../../models/user';

export default {
  type: userType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID)
    },
    data: {
      name: 'data',
      type: new GraphQLNonNull(userInputType)
    }
  },
  resolve(root, params) {
    return UserModel.findByIdAndUpdate(params.id, { $set: { ...params.data }})
      .then(data => UserModel.findById(params.id).exec())
      .catch(err => new Error('Could not update user data ', err));
  }
}
