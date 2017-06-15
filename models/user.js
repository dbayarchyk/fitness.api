import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';
import config from '../config';

const UserSchema = new mongoose.Schema({
  email:     { type: String, required: true, unique: true },
  password:  { type: String, required: true },
  name:      { type: String, },
  surname:   { type: String },
  role:      { type: String, default: 'user' },
  avatarUrl: { type: String },
  age:       { type: Number },
  weight:    { type: Number }
}, { collection: 'user', cotimestamps: true });

UserSchema.pre('save', function (next) {
  let user = this;

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
});

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) {
      return cb(err);
    }

    cb(null, isMatch);
  });
};

export default mongoose.model('User', UserSchema);
