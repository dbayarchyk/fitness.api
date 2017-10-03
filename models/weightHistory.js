import mongoose from 'mongoose';

const WeightHistorySchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User'
  },      
  date: { 
    type: Date, 
    default: Date.now
  },
  weight: {
    type: Number,
    required: true,
    default: 0
  }
}, { collection: 'weightHistory', timestamps: true });

export default mongoose.model('WeightHistory', WeightHistorySchema);