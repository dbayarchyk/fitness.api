import bcrypt from 'bcrypt-nodejs';
import mongoose from 'mongoose';

import WeightHistory from './weightHistory';
import config from '../config';
import getBodyMassIndex from '../helpers/bodyMassIndex';
import * as PURPOSE from '../constants/purpose';

const UserSchema = new mongoose.Schema({
  email:         { type: String, required: true, unique: true },
  password:      { type: String, required: true },
  name:          { type: String, },
  surname:       { type: String },
  role:          { type: String, default: 'user' },
  avatarUrl:     { type: String },
  age:           { type: Number, required: true },
  gender:           { 
    type: String, 
    required: true, 
    enum: {                 
      values: [ 
        'male', 
        'female'
      ],
      message: 'enum validator failed for path `{PATH}` with value `{VALUE}`'
    } 
  },
  height:        { type: Number, required: true, default: 0 },
  weight:        { type: Number, required: true, default: 0 },
  physicalState: { type: String },
  purpose:       { 
    type: String, 
    required: true, 
    enum: { 
      values: [ 
        PURPOSE.INCREASE_MUSCLE_MASS, 
        PURPOSE.INCREASE_MUSCLE_STRENGTH, 
        PURPOSE.WEIGHT_LOSS,
        PURPOSE.CREATING_A_BODY_RELIEF,
        PURPOSE.MAINTAINING_THE_FORM_ALREADY_ACHIEVED
      ],
      message: 'enum validator failed for path `{PATH}` with value `{VALUE}`'
    } 
  },
  bodyMassIndex: { type: Number, default: 0 },
  foodPlan:      { type: mongoose.Schema.Types.ObjectId, ref: 'FoodPlan' },
  trainingPlan:  { type: mongoose.Schema.Types.ObjectId, ref: 'TrainingPlan' }
}, { collection: 'users', timestamps: true });

UserSchema.pre('save', preSave);

function preSave (next) {
  let user = this;

  if (user.isModified('height') || user.isModified('weight')) {
    user.bodyMassIndex = getBodyMassIndex(user.weight, user.height);
  }

  if (user.isModified('weight')) {
    const weightHistoryItem = new WeightHistory({
      userId: user._id,
      weight: user.weight
    });

    weightHistoryItem.save();
  }

  if (!user.isModified('password')) {
    return next();
  }

  bcrypt.genSalt(config.SALT_FACTOR, (err, salt) => {
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) {
        return next(err);
      }

      user.password = hash;
      next();
    });
  });
}

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) {
      return cb(err);
    }

    cb(null, isMatch);
  });
};

export default mongoose.model('User', UserSchema);