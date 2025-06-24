import pool from "../../db/pool.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const loginController = async (req, res) => {
  const { email, password } = req.body

  try {

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" })
    }

    const [userFound] = await pool.query("SELECT * FROM users WHERE email = ?", [email])

    if (userFound.length === 0) {
      return res.status(404).json({ message: "User not found" })
    }

    const passwordMatch = await bcrypt.compare(password, userFound[0].password)

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" })
    }

    const token = jwt.sign({ id: userFound[0].id }, process.env.JWT_SECRET, { expiresIn: "1d" })

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day

    })

    return res.status(200).json({ message: "Login successful" })

  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Internal server error" })
  }
}

export default loginController
