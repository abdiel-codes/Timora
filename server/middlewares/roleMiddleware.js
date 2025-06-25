const roleMiddleware = (user) => (req, res, next) => {
  if (user.role !== "admin") {
    return res.status(403).json({ message: "Unauthorized" })
  }
  next()
}

export default roleMiddleware
