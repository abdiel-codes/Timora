import pool from "../../db/pool.js"
import bcrypt from "bcrypt"

const registerController = async (req, res) => {
  const { username, email, password } = req.body

  try {

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" })
    }

    const [userFound] = await pool.query("SELECT * FROM users WHERE email = ?", [email])
    const [usernameTaken] = await pool.query("SELECT * FROM users WHERE username = ?", [username])

    if (userFound.length > 0) {
      return res.status(400).json({ message: "Email already exists" })
    }

    if (usernameTaken.length > 0) {
      return res.status(400).json({ message: "Username already taken" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await pool.query("INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)", [username, email, hashedPassword])

    return res.status(201).json({ message: "User created successfully" })

  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Internal server error" })
  }
}

export default registerController
