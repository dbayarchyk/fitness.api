import userMutation from './user';
import authMutation from './auth';
import foodMutation from './food';

export default {
  ...userMutation,
  ...authMutation,
  ...foodMutation,
}
