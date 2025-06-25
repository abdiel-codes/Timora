import pool from "../../db/pool.js";

const getGroupTasks = async (req, res) => {
  const { groupId } = req.params;
  const id = req.user.id;

  const [membership] = await pool.query("SELECT role FROM group_users WHERE user_id = ? AND group_id = ?", [id, groupId]);

  if (membership.length === 0) {
    return res.status(403).json({ message: "Not authorized" });
  }

  try {
    if (!groupId) return res.status(400).json({ message: "Missing group id" });

    const [tasks] = await pool.query("SELECT * FROM tasks WHERE group_id = ? ORDER BY created_at DESC", [groupId]);

    return res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default getGroupTasks;
