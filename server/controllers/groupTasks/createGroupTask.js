import pool from "../../db/pool.js";

const createGroupTask = async (req, res) => {
  const id = req.user.id;
  const { title, description } = req.body;
  const { groupId } = req.params;

  try {
    if (!groupId || !title) return res.status(400).json({ message: "Missing group id or title" });

    const [membership] = await pool.query("SELECT role FROM group_users WHERE user_id = ? AND group_id = ?", [id, groupId]);

    if (membership.length === 0) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await pool.query("INSERT INTO tasks (title, description, user_id, group_id) VALUES (?, ?, ?, ?)", [title, description, id, groupId]);

    return res.status(201).json({ message: "Task created successfully" });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default createGroupTask;
