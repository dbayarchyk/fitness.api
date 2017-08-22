import userQuery from './user';
import foodQuery from './food';
import foodHistoryQuery from './foodHistory';

export default {
  ...userQuery,
  ...foodQuery,
  ...foodHistoryQuery
}
