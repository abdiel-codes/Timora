import mysql from 'mysql2'
import dotenv from 'dotenv'

dotenv.config()

const HOST = process.env.HOST
const PASSWORD = process.env.PASSWORD
const DATABASE = process.env.DATABASE


export const pool = mysql.createPool({
  host: HOST,
  user: "root",
  password: PASSWORD,
  database: DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
}).promise()

export default pool
