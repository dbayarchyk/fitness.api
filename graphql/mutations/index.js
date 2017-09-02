import authMutation from './auth';
import userMutation from './user';
import foodMutation from './food';
import foodHistoryMutation from './foodHistory';
import exerciseMutation from './exercise';
import foodPlanMutation from './foodPlan';
import trainingPlanMutation from './trainingPlan';

export default {
  ...userMutation,
  ...authMutation,
  ...foodMutation,
  ...foodHistoryMutation,
  ...exerciseMutation,
  ...foodPlanMutation,
  ...trainingPlanMutation
}
