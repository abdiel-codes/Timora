import pool from "../../db/pool.js";

const deleteGroupTask = async (req, res) => {
  const id = req.user.id;
  const { groupId, taskId } = req.params;

  try {
    if (!groupId || !taskId) return res.status(400).json({ message: "Missing group id or task id" });

    const [membership] = await pool.query("SELECT role FROM group_users WHERE user_id = ? AND group_id = ?", [id, groupId]);

    if (membership.length === 0) {
      return res.status(403).json({ message: "Not authorized" });
    }

    if (membership[0].role !== "admin") {
      return res.status(403).json({ message: "Not authorized, only admin can delete tasks" });
    }


    const result = await pool.query("DELETE FROM tasks WHERE id = ? AND group_id = ?", [taskId, groupId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Task not found, or not is in this group" });
    }

    return res.status(200).json({ message: "Task deleted successfully" });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default deleteGroupTask;


