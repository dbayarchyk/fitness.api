import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';
import config from '../config';
import roundDecimal from '../helpers/roundDecimal';

const FoodSchema = new mongoose.Schema({
  name:           { type: String, required: true },
  category:       { type: String, required: true },
  avatarUrl:      { type: String },
  calorificValue: { type: Number, required: true, set: v => roundDecimal(v), get: v => roundDecimal(v) },
  proteins:       { type: Number, required: true, set: v => roundDecimal(v, 2), get: v => roundDecimal(v, 2) },
  carbohydrates:  { type: Number, required: true, set: v => roundDecimal(v, 2), get: v => roundDecimal(v, 2) },
  fats:           { type: Number, required: true, set: v => roundDecimal(v, 2), get: v => roundDecimal(v, 2) }
}, { collection: 'foods', timestamps: true });

export default mongoose.model('Food', FoodSchema);
