export default {
  PORT:       process.env.PORT || 8080,
  MONGO_URI:  process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET || 'secret'
}
