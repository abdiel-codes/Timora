import pool from "../../../db/pool.js";

const leaveGroup = async (req, res) => {
  const id = req.user.id;
  const { groupId } = req.params;

  try {
    if (!groupId) return res.status(400).json({ message: "Missing group id" });

    if (!id) return res.status(400).json({ message: "Not authorized" });

    const [membership] = await pool.query("SELECT role FROM group_users WHERE user_id = ? AND group_id = ?", [id, groupId]);

    if (membership.length === 0) {
      return res.status(403).json({ message: "You are not a member of this group" });
    }

    if (membership[0].role === "admin") {
      return res.status(403).json({ message: "Admin cannot leave the group" });
    }

    await pool.query("DELETE FROM group_users WHERE user_id = ? AND group_id = ?", [id, groupId]);

    return res.status(200).json({ message: "Left group successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default leaveGroup;
