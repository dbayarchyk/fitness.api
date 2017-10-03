import authMutation from './auth';
import userMutation from './user';
import foodMutation from './food';
import foodHistoryMutation from './foodHistory';
import trainingHistoryMutation from './trainingHistory';
import exerciseMutation from './exercise';
import foodPlanMutation from './foodPlan';
import trainingPlanMutation from './trainingPlan';
import muscleMutation from './muscle';

export default {
  ...userMutation,
  ...authMutation,
  ...foodMutation,
  ...foodHistoryMutation,
  ...trainingHistoryMutation,
  ...exerciseMutation,
  ...foodPlanMutation,
  ...trainingPlanMutation,
  ...muscleMutation
}
