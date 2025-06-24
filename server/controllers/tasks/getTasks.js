import pool from "../../db/pool.js";

const getTasks = async (req, res) => {
  const user_id = req.user.id;
  const { status, priority, due_date, sort } = req.query;

  try {
    if (!user_id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const allowedStatus = ["pending", "in_progress", "completed"];
    const allowedPriority = ["low", "medium", "high"];
    if (status && !allowedStatus.includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    if (priority && !allowedPriority.includes(priority)) {
      return res.status(400).json({ error: "Invalid priority" });
    }

    const values = [user_id];

    let query = "SELECT * FROM tasks WHERE user_id = ?";

    if (status) {
      query += " AND status = ?";
      values.push(status);
    }

    if (priority) {
      query += " AND priority = ?";
      values.push(priority);
    }

    if (due_date) {
      query += " AND due_date = ?";
      values.push(due_date);
    }

    query += " ORDER BY " + (sort === "due_date_desc" ? "due_date DESC" : "created_at DESC");

    const [results] = await pool.query(query, values);

    return res.status(200).json(results);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export default getTasks;
