import {
  GraphQLNonNull,
  GraphQLString,
  GraphQLObjectType
} from 'graphql';
import bcrypt from 'bcrypt-nodejs';

import UserModel from '../../../models/user';
import { userType } from '../../types/user';
import { createToken } from '../../../helpers/auth';

export default {
  type: new GraphQLObjectType({
    name: 'Login',
    fields: () => ({
      token: { type: new GraphQLNonNull(GraphQLString) },
      user:  { type: userType }
    })
  }),
  args: {
    email: {
      name: 'email',
      type: new GraphQLNonNull(GraphQLString)
    },
    password: {
      name: 'password',
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve(root, params) {
    return UserModel.findOne({ email: params.email })
      .then(user => new Promise((resolve) => {
        if (!user) {
          resolve(new Error('User with this email doesn\'t exist'))
        }

        user.comparePassword(params.password, (err, isMatch) => {
          if (err) {
            resolve(new Error(err))
          }

          if (isMatch) {
            resolve({
              token: createToken({ _id: user._id }),
              user: user
            })
          }

          resolve(new Error('Password is incorrect'))
        });
      }))
      .catch(err => new Error('User with this email doesn\'t exist'));
  }
}
