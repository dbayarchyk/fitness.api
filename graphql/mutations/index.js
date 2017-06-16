import userMutation from './user'
import authMutation from './auth'

export default {
  ...userMutation,
  ...authMutation
}
