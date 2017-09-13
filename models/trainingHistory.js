import mongoose from 'mongoose';

const TrainingHistorySchema = new mongoose.Schema({
  userId:            { type: mongoose.Schema.Types.ObjectId, ref: 'User' },      
  date:              { type: Date, default: Date.now },
  exerciseAproaches: [ { 
    exercise: { type: mongoose.Schema.Types.ObjectId, ref: 'Exercise' },
    count: { type: Number }
  } ],
  trainingIdInPlan: { type: mongoose.Schema.Types.ObjectId }
}, { collection: 'trainingHistory', timestamps: true });

export default mongoose.model('TrainingHistory', TrainingHistorySchema);