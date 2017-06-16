import jwt from 'jsonwebtoken';
import config from '../config';

exports.createToken = user =>
  jwt.sign(
    {
        user: user
    },
    config.JWT_SECRET
  );
