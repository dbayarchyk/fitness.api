import bcrypt from 'bcrypt-nodejs';
import config from '../config';
import mongoose from 'mongoose';
import FoodModel from './food';
import roundDecimal from '../helpers/roundDecimal';

const FoodPlanSchema = new mongoose.Schema({
  name:            { type: String, required: true },
  meals:           [ { 
    foods: [ {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Food', required: true },
      weight:  { type: Number, required: true, default: 0, set: v => roundDecimal(v), get: v => roundDecimal(v) }
    } ],
    date: { type: Date },
    nutrients:       {
      proteins:      { type: Number, default: 0, set: v => roundDecimal(v, 2), get: v => roundDecimal(v, 2) },
      carbohydrates: { type: Number, default: 0, set: v => roundDecimal(v, 2), get: v => roundDecimal(v, 2) },
      fats:          { type: Number, default: 0, set: v => roundDecimal(v, 2), get: v => roundDecimal(v, 2) }
    },
  } ],
  nutrients:       {
    proteins:      { type: Number, default: 0, set: v => roundDecimal(v, 2), get: v => roundDecimal(v, 2) },
    carbohydrates: { type: Number, default: 0, set: v => roundDecimal(v, 2), get: v => roundDecimal(v, 2) },
    fats:          { type: Number, default: 0, set: v => roundDecimal(v, 2), get: v => roundDecimal(v, 2) }
  },
  calorificValue: { type: Number, default: 0, set: v => roundDecimal(v), get: v => roundDecimal(v)}
}, { collection: 'foodHistory', timestamps: true });

FoodPlanSchema.pre('save', function preSave(next) {
  let foodPlan = this;

  if (foodHistoryItem.isModified('meals')) {
    const foodIds = [];
    foodPlan.meals.forEach(meal => meal.foods.forEach(food => foodIds.push(food.product) ));

    foodPlan.populate('meals.foods.product').exec()
      .then(populatedFoodPlan => {
        foodPlan.nutrients = {
          proteins: 0,
          carbohydrates: 0,
          fats: 0
        };

        foodPlan.calorificValue = 0;

        foodPlan.meals.forEach(meal => {
          meal.nutrients = {
            proteins: 0,
            carbohydrates: 0,
            fats: 0
          };
  
          meal.calorificValue = 0;

          meal.foods.forEach((food, foodIndex) => {
            meal.calorificValue += food.calorificValue * meal.foods[foodIndex].weight / 100;
            meal.nutrients.proteins += food.proteins * meal.foods[foodIndex].weight / 100;
            meal.nutrients.carbohydrates += food.carbohydrates * meal.foods[foodIndex].weight / 100;
            meal.nutrients.fats += food.fats * meal.foods[foodIndex].weight / 100;
          });
        })

        foodPlan.meals.forEach(meal => {
          foodPlan.calorificValue += meal.calorificValue;
          foodPlan.nutrients.proteins += meal.nutrients.proteins;
          foodPlan.nutrients.carbohydrates += meal.nutrients.carbohydrates;
          foodPlan.nutrients.fats += meal.nutrients.fats;
        });

        next();
      })
      .catch(err => new Error('Could not find this products, err'));

  }
});

export default mongoose.model('FoodPlan', FoodPlanSchema);
