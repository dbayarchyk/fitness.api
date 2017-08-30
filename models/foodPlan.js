import bcrypt from 'bcrypt-nodejs';
import config from '../config';
import mongoose from 'mongoose';
import roundDecimal from '../helpers/roundDecimal';

const FoodPlanSchema = new mongoose.Schema({
  name:            { type: String, required: true },
  avatarUrl:       { type: String },
  meals:           [ { 
    foods: [ {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Food', required: true },
      weight:  { type: Number, required: true, default: 0, set: v => roundDecimal(v), get: v => roundDecimal(v) }
    } ],
    date: { type: Date },
    calorificValue: { type: Number, default: 0, set: v => roundDecimal(v), get: v => roundDecimal(v)},
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
}, { collection: 'foodPlans', timestamps: true });

FoodPlanSchema.pre('save', function preSave(next) {
  let foodPlan = this;

  if (foodPlan.isModified('meals')) {
    const foodIds = [];
    foodPlan.meals.forEach(meal => meal.foods.forEach(food => foodIds.push(food.product) ));

    foodPlan.populate('meals.foods.product').execPopulate()
      .then(populatedFoodPlan => {
        foodPlan.nutrients = {
          proteins: 0,
          carbohydrates: 0,
          fats: 0
        };

        foodPlan.calorificValue = 0;

        foodPlan.meals.forEach((meal, mealIndex) => {
          foodPlan.meals[mealIndex].nutrients = {
            proteins: 0,
            carbohydrates: 0,
            fats: 0
          };
  
          foodPlan.meals[mealIndex].calorificValue = 0;

          meal.foods.forEach((food, foodIndex) => {
            foodPlan.meals[mealIndex].calorificValue += food.product.calorificValue * populatedFoodPlan.meals[mealIndex].foods[foodIndex].weight / 100;
            foodPlan.meals[mealIndex].nutrients.proteins += food.product.proteins * populatedFoodPlan.meals[mealIndex].foods[foodIndex].weight / 100;
            foodPlan.meals[mealIndex].nutrients.carbohydrates += food.product.carbohydrates * populatedFoodPlan.meals[mealIndex].foods[foodIndex].weight / 100;
            foodPlan.meals[mealIndex].nutrients.fats += food.product.fats * populatedFoodPlan.meals[mealIndex].foods[foodIndex].weight / 100;
          });
        });

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
