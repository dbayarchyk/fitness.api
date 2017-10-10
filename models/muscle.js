import mongoose from 'mongoose';

import * as MUSCLES_GROUP from '../constants/muscleGroups';

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
        MUSCLES_GROUP.PECTORALIS,
        MUSCLES_GROUP.BACK,
        MUSCLES_GROUP.BICEPS,
        MUSCLES_GROUP.TRICEPS,
        MUSCLES_GROUP.LEGS,
        MUSCLES_GROUP.SHOULDERS
      ],
      message: 'enum validator failed for path `{PATH}` with value `{VALUE}`'
    } 
  }

}, { collection: 'muscles', timestamps: true });

export default mongoose.model('Muscle', MuscleSchema);