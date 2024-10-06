import dotenv from 'dotenv'

dotenv.config()
const config = {
  PORT: process.env.PORT || 8080,
  SECRET_KEY: process.env.SECRET_KEY || '',
  ACCESS_LOG: process.env.ACCESS_LOG || 'access.log'
}
export default config
