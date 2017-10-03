import mongoose from 'mongoose';

const MuscleSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  group: {
    type: String,
    required: true,
    enum: { 
      values: [ 
        'PECTORALIS',
        'BICEPS',
        'TRICEPS',
        'BACK',
        'LEGS',
        'SHOULDERS'
      ],
      message: 'enum validator failed for path `{PATH}` with value `{VALUE}`'
    } 
  }

}, { collection: 'muscles', timestamps: true });

export default mongoose.model('Muscle', MuscleSchema);