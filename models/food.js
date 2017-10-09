import mongoose from 'mongoose';
import roundDecimal from '../helpers/roundDecimal';

const FoodSchema = new mongoose.Schema({
  name:           { type: String, required: true },
  category:       { type: String, required: true },
  avatarUrl:      { type: String, default: 'https://image.freepik.com/free-icon/precious-diamond-jewelry_318-31428.jpg' },
  calorificValue: { type: Number, required: true, set: v => roundDecimal(v), get: v => roundDecimal(v) },
  proteins:       { type: Number, required: true, set: v => roundDecimal(v, 2), get: v => roundDecimal(v, 2) },
  carbohydrates:  { type: Number, required: true, set: v => roundDecimal(v, 2), get: v => roundDecimal(v, 2) },
  fats:           { type: Number, required: true, set: v => roundDecimal(v, 2), get: v => roundDecimal(v, 2) }
}, { collection: 'foods', timestamps: true });

export default mongoose.model('Food', FoodSchema);
