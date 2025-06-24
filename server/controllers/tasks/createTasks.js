import pool from "../../db/pool.js";

const createTasks = async (req, res) => {
  const { title, description, status, due_date, priority } = req.body;
  const user_id = req.user.id;

  try {
    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    const [result] = await pool.query(
      "INSERT INTO tasks (title, description, user_id) VALUES (?, ?, ?)",
      [title, description, user_id]
    );

    const newTask = {
      id: result.insertId,
      title,
      description: description || null,
      status,
      due_date,
      priority,
      user_id: user_id,
    };

    return res.status(201).json(newTask);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export default createTasks;
