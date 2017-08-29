import {
  GraphQLNonNull,
  GraphQLID
} from 'graphql';

import UserModel from '../../../models/user';
import { dailyNutritionRateType } from '../../types/dailyNutritionRate';

const BMR_CONSTANTS_BY_SEX = {
  male: {
    coefficient: 88.36,
    weight: 13.4,
    height: 4.8,
    age: 5.7
  },
  female: {
    coefficient: 447.6,
    weight: 9.2,
    height: 3.1,
    age: 4.3
  }
};

// TODO: move is to user modal
const ACTIVITY_COEFFICIENT = 1.55;

const getBMR = ({ sex, weight, height, age }) =>
  BMR_CONSTANTS_BY_SEX[sex].coefficient 
  + BMR_CONSTANTS_BY_SEX[sex].weight * weight 
  + BMR_CONSTANTS_BY_SEX[sex].height * height
  - BMR_CONSTANTS_BY_SEX[sex].age * age;

export default {
  type: dailyNutritionRateType,
  args: {
    _id: { name: '_id', type: new GraphQLNonNull(GraphQLID) }
  },
  resolve(root, params, context) {
    if (!context.user) {
      throw new Error('You have not access');
    }

    return new Promise((resolve, reject) => {
      UserModel.findById(params._id).populate('foodPlan').exec()
        .then(user => {
          let dailyNutritionRate = null;

          if (user.foodPlan) {
            dailyNutritionRate = {
              calorificValue: user.foodPlan.calorificValue,
              nutrients: user.foodPlan.nutrients
            };
          } else {
            const commonCalorificValue = Math.round(getBMR(user) * ACTIVITY_COEFFICIENT);

            dailyNutritionRate = {
              calorificValue: commonCalorificValue,
              nutrients: {
                proteins: Math.round(commonCalorificValue / 24),
                carbohydrates: Math.round(commonCalorificValue / 6),
                fats: Math.round(commonCalorificValue / 54)
              }
            };
          }

          resolve(dailyNutritionRate);
        })
        .catch(err => reject(err))
    });
  }
}
