import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';
import config from '../config';

const FoodSchema = new mongoose.Schema({
  name:           { type: String, required: true },
  category:       { type: String, required: true },
  avatarUrl:      { type: String },
  calorificValue: { type: Number, required: true },
  proteins:       { type: Number, required: true },
  carbohydrates:  { type: Number, required: true },
  fats:           { type: Number, required: true }
}, { collection: 'foods', timestamps: true });

export default mongoose.model('Food', FoodSchema);
