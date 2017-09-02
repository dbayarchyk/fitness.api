import mongoose from 'mongoose';

const TrainingPlanSchema = new mongoose.Schema({
  name:            { type: String, required: true },
  avatarUrl:       { type: String },
  sex:             { type: String },
  complexity:      { type: Number },
  trainings:       [ { 
    date: { type: Date },
    exerciseAproaches: [ { 
      exercise: { type: mongoose.Schema.Types.ObjectId, ref: 'Exercise' },
      count: { type: Number }
    } ]
  } ]
}, { collection: 'trainingPlans', timestamps: true });

export default mongoose.model('TrainingPlan', TrainingPlanSchema);