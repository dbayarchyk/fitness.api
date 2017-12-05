import {
  GraphQLNonNull,
  GraphQLID
} from 'graphql';

import { trainingPlanType, trainingPlanInputType } from '../../types/trainingPlan';
import TrainingPlanModel from '../../../models/trainingPlan';
import UserModel from '../../../models/user';
import generateTrainingPlan from '../../../helpers/generateTrainingPlan';

export default {
  type: trainingPlanType,
  args: {
    userId: {
      name: 'userId',
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolve(root, params, context) {
    if (!context.user) {
      throw new Error('You have not access');
    }

    const newTrainingPlan = new Promise((resolve, reject) => {
      UserModel.findById(params.userId).exec()
        .then(user => {
          generateTrainingPlan(user)
            .then(generatedTrainingPlan => {
              const trainingPlan = new TrainingPlanModel(generatedTrainingPlan);

              trainingPlan.name = `User-${user._id} training plan-${trainingPlan._id}`;

              trainingPlan.save()
                .then(createdTrainingPlan => {
                  user.trainingPlan = createdTrainingPlan._id

                  user.save()
                    .then(savedUser => resolve(createdTrainingPlan))
                    .catch(err => reject(new Error('Error in generating training plan')))
                })
                .catch(err => reject(new Error('Error in generating training plan')));
            })
            .catch(err => reject(new Error('Error in generating training plan')));
        })
        .catch(err => reject(new Error('Error in generating training plan')));
    });

    return newTrainingPlan;
  }
}
