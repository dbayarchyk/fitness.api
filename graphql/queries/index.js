import userQuery from './user';
import foodQuery from './food';
import foodHistoryQuery from './foodHistory';
import foodPlanQuery from './foodPlan';
import exerciseQuery from './exercise';
import trainingPlanQuery from './trainingPlan';
import trainingHistoryQuery from './trainingHistory';

export default {
  ...userQuery,
  ...foodQuery,
  ...foodHistoryQuery,
  ...foodPlanQuery,
  ...exerciseQuery,
  ...trainingPlanQuery,
  ...trainingHistoryQuery
}
