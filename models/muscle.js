import mongoose from 'mongoose';

import MUSCLES_GROUPS from '../constants/muscleGroups';

const MuscleSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  group: {
    type: String,
    required: true,
    enum: { 
      values: MUSCLES_GROUPS,
      message: 'enum validator failed for path `{PATH}` with value `{VALUE}`'
    } 
  }

}, { collection: 'muscles', timestamps: true });

export default mongoose.model('Muscle', MuscleSchema);