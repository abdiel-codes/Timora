import pool from "../../db/pool.js"

const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, status, due_date, priority } = req.body;
  const user_id = req.user.id;

  try {
    if (!user_id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const updates = [];
    const values = [];

    if (title) {
      updates.push("title = ?");
      values.push(title);
    }

    if (description) {
      updates.push("description = ?");
      values.push(description);
    }

    if (status) {
      updates.push("status = ?");
      values.push(status);
    }

    if (due_date) {
      updates.push("due_date = ?");
      values.push(due_date);
    }

    if (priority) {
      updates.push("priority = ?");
      values.push(priority);
    }

    if (updates.length === 0) {
      return res.status(400).json({ error: "No updates provided" });
    }

    const sql = `UPDATE tasks SET ${updates.join(", ")} WHERE id = ? AND user_id = ?`;
    values.push(id, user_id);

    const [result] = await pool.query(sql, values);


    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Task not found" });
    }

    const updatedTask = {
      id,
      title,
      description,
      status,
      due_date,
      priority,
      user_id,
    };

    return res.status(200).json({ message: "Task updated successfully", task: updatedTask });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export default updateTask 
