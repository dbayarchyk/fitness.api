import userQuery from './user';
import foodQuery from './food';
import foodHistoryQuery from './foodHistory';
import foodPlanQuery from './foodPlan';

export default {
  ...userQuery,
  ...foodQuery,
  ...foodHistoryQuery,
  ...foodPlanQuery
}
