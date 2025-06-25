import pool from "../../../db/pool.js";

const kickGroupMember = async (req, res) => {
  const id = req.user.id;
  const { groupId, userId } = req.params;

  try {
    if (!groupId) return res.status(400).json({ message: "Missing group id" });

    if (!id) return res.status(400).json({ message: "Not authorized" });

    if (!userId) return res.status(400).json({ message: "Missing user id" });

    const [membership] = await pool.query("SELECT role FROM group_users WHERE user_id = ? AND group_id = ?", [id, groupId]);

    if (membership.length === 0) {
      return res.status(403).json({ message: "You are not a member of this group" });
    }

    if (membership[0].role !== "admin") {
      return res.status(403).json({ message: "Only admin can kick members" });
    }

    if (parseInt(userId) === parseInt(id)) {
      return res.status(403).json({ message: "You cannot kick yourself" });
    }

    const [target] = await pool.query("SELECT * FROM group_users WHERE user_id = ? AND group_id = ?", [userId, groupId]);

    if (target.length === 0) {
      return res.status(404).json({ message: "Member not found" });
    }

    await pool.query("DELETE FROM group_users WHERE user_id = ? AND group_id = ?", [userId, groupId]);

    return res.status(200).json({ message: "Member kicked successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default kickGroupMember;
