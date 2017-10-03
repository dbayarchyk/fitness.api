import userQuery from './user';
import foodQuery from './food';
import foodHistoryQuery from './foodHistory';
import foodPlanQuery from './foodPlan';
import exerciseQuery from './exercise';
import trainingPlanQuery from './trainingPlan';
import trainingHistoryQuery from './trainingHistory';
import weightHistoryQuery from './weightHistory';
import muscleQuery from './muscle';

export default {
  ...userQuery,
  ...foodQuery,
  ...foodHistoryQuery,
  ...foodPlanQuery,
  ...exerciseQuery,
  ...trainingPlanQuery,
  ...trainingHistoryQuery,
  ...weightHistoryQuery,
  ...muscleQuery
}
