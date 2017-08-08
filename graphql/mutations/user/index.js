import addUser from './add';
import removeUser from './remove';
import updateUser from './update';

import foodHistoryMutations from './foodHistory';

export default {
  addUser,
  removeUser,
  updateUser,
  ...foodHistoryMutations
}
