import bcrypt from 'bcrypt-nodejs';
import config from '../config';
import getBodyMassIndex from '../helpers/bodyMassIndex';
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email:         { type: String, required: true, unique: true },
  password:      { type: String, required: true },
  name:          { type: String, },
  surname:       { type: String },
  role:          { type: String, default: 'user' },
  avatarUrl:     { type: String },
  age:           { type: Number, required: true },
  height:        { type: Number, required: true, default: 0 },
  weight:        { type: Number, required: true, default: 0 },
  bodyMassIndex: { type: Number, default: 0 },
  weightHistory: [ {
    weight:      { type: Number, required: true, default: 0 },
    date:        { type: Date, default: Date.now }
  } ],
  foodHistory:   [ {
    foods:       [ {
      food:      { type: mongoose.Schema.Types.ObjectId, ref: 'Food' },
      weight:    { type: Number, required: true, default: 0 }
    } ],
    date:        { type: Date, default: Date.now },
    nutrients:   {
      proteins:  { type: Number, default: 0 },
      carbohydrates: { type: Number, default: 0 },
      fats:      { type: Number, default: 0 }
    },
    calorificValue: { type: Number, default: 0 }
  } ]
}, { collection: 'users', timestamps: true });

UserSchema.pre('save', preSave);

function preSave (next) {
  let user = this;

  if (user.isModified('height') || user.isModified('weight')) {
    user.bodyMassIndex = getBodyMassIndex(user.weight, user.height);
  }

  if (user.isModified('weight')) {
    user.weightHistory.push( { weight: user.weight });
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
