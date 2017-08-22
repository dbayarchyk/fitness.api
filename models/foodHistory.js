import bcrypt from 'bcrypt-nodejs';
import config from '../config';
import getBodyMassIndex from '../helpers/bodyMassIndex';
import mongoose from 'mongoose';
import FoodModel from './food';
import roundDecimal from '../helpers/roundDecimal';

const FoodHistorySchema = new mongoose.Schema({
  userId:          { type: mongoose.Schema.Types.ObjectId, ref: 'User' },      
  foods:           [ {
    product:       { type: mongoose.Schema.Types.ObjectId, ref: 'Food' },
    weight:        { type: Number, required: true, default: 0, set: v => roundDecimal(v), get: v => roundDecimal(v) }
  } ],
  date:            { type: Date, default: Date.now },
  nutrients:       {
    proteins:      { type: Number, default: 0, set: v => roundDecimal(v, 2), get: v => roundDecimal(v, 2) },
    carbohydrates: { type: Number, default: 0, set: v => roundDecimal(v, 2), get: v => roundDecimal(v, 2) },
    fats:          { type: Number, default: 0, set: v => roundDecimal(v, 2), get: v => roundDecimal(v, 2) }
  },
  calorificValue: { type: Number, default: 0, set: v => roundDecimal(v), get: v => roundDecimal(v)}
}, { collection: 'foodHistory', timestamps: true });

FoodHistorySchema.pre('save', function preSave(next) {
  let foodHistoryItem = this;

  if (foodHistoryItem.isModified('foods')) {
    const foodIds = foodHistoryItem.foods.map(food => food.product);

    FoodModel.find({ _id: { $in: foodIds }}).exec()
      .then(foods => {
        foodHistoryItem.nutrients = {
          proteins: 0,
          carbohydrates: 0,
          fats: 0
        };
        foodHistoryItem.calorificValue = 0;
        foods.forEach((food, foodIndex) => {
          foodHistoryItem.calorificValue += food.calorificValue * foodHistoryItem.foods[foodIndex].weight / 100;
          foodHistoryItem.nutrients.proteins += food.proteins * foodHistoryItem.foods[foodIndex].weight / 100;
          foodHistoryItem.nutrients.carbohydrates += food.carbohydrates * foodHistoryItem.foods[foodIndex].weight / 100;
          foodHistoryItem.nutrients.fats += food.fats * foodHistoryItem.foods[foodIndex].weight / 100;
        });

        next();
      })
      .catch(err => new Error('Could not find this products, err'));
  }
});

export default mongoose.model('FoodHistory', FoodHistorySchema);
