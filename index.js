import express from 'express';
import mongoose from 'mongoose';
import graphqlHTTP from 'express-graphql';
import jwt from'express-jwt';
import cors from 'cors';

import UserModel from './models/user';
import config from './config';
import schema from './graphql';

const app = express();

mongoose.connect(config.MONGO_URI);
const db = mongoose.connection;

db.on('error', () => console.log('Failed to connect to database'))
  .once('open', () => console.log('Connected to DB'));

app.use(cors());

app.get('/', (req, res) => res.send('Hello world, this is Graph'));

app.use('/graphql', jwt({
  secret: config.JWT_SECRET,
  credentialsRequired: false,
}));
app.use('/graphql', (req, res, done) => {
  req.context = {
    user: req.user,
  }

  done();
});
app.use('/graphql', graphqlHTTP(req => ({
  schema,
  graphiql: true,
  pretty: true,
  context: req.context
})));

app.listen(config.PORT, () => console.log(`Server is running on ${config.PORT}`));
