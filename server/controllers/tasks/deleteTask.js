import pool from "../../db/pool.js";

const deleteTask = async (req, res) => {
  const { id } = req.params;
  const user_id = req.user.id;

  try {
    if (!user_id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const [result] = await pool.query(
      "DELETE FROM tasks WHERE id = ? AND user_id = ?",
      [id, user_id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Task not found" });
    }

    return res.status(200).json({ message: "Task deleted successfully", taskId: id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export default deleteTask;
