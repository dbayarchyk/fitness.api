import authMutation from './auth';
import userMutation from './user';
import foodMutation from './food';
import foodHistoryMutation from './foodHistory';
import exerciseMutation from './exercise';
import foodPlanMutation from './foodPlan';

export default {
  ...userMutation,
  ...authMutation,
  ...foodMutation,
  ...foodHistoryMutation,
  ...exerciseMutation,
  ...foodPlanMutation
}
