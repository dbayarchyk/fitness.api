import {
  GraphQLNonNull
} from 'graphql';

import { userType, userInputType } from '../../types/user';
import UserModel from '../../../models/user';

export default {
  type: userType,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(userInputType)
    }
  },
  resolve(root, params, context) {
    const user = new UserModel(params.data);

    const newUser = user.save();

    if (!newUser) {
      throw new Error('Error adding user');
    }

    return newUser;
  }
}
