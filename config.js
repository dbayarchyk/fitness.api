export default {
  PORT:       process.env.PORT || 8080,
  MONGO_URI:  process.env.MONGO_URI || 'mongodb://root:root@ds127962.mlab.com:27962/fitness',
  JWT_SECRET: process.env.JWT_SECRET || 'secret'
}
