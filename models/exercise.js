import mongoose from 'mongoose';
import roundDecimal from '../helpers/roundDecimal';

const ExerciseSchema = new mongoose.Schema({
  name:           { type: String, required: true },
  avatarUrl:      { type: String },
  photos:         [ { type: String } ],
  muscules:       [ { type: mongoose.Schema.Types.ObjectId, ref: 'Muscle', required: true } ],
  description:    { type: String },
  complexity:     { type: Number, required: true },
  video:          { type: String }
}, { collection: 'exercises', timestamps: true });

export default mongoose.model('Exercise', ExerciseSchema);