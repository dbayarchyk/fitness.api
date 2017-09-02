import userQuery from './user';
import foodQuery from './food';
import foodHistoryQuery from './foodHistory';
import foodPlanQuery from './foodPlan';
import trainingPlanQuery from './trainingPlan';

export default {
  ...userQuery,
  ...foodQuery,
  ...foodHistoryQuery,
  ...foodPlanQuery,
  ...trainingPlanQuery
}
