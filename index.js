import express from 'express';
import mongoose from 'mongoose';
import graphqlHTTP from 'express-graphql';

import config from './config';
import schema from './graphql';

const app = express();

mongoose.connect(config.MONGO_URI);
const db = mongoose.connection;

db.on('error', () => console.log('Failed to connect to database'))
  .once('open', () => console.log('Connected to DB'));

app.get('/', (req, res) => res.send('Hello world, this is Graph'));

app.use('/graphql', graphqlHTTP(() => ({
  schema,
  graphiql: true,
  pretty: true
})));

app.listen(config.PORT, () => console.log(`Server is running on ${config.PORT}`));
