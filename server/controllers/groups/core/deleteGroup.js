import pool from "../../../db/pool.js";

const deleteGroup = async (req, res) => {
  const id = req.user.id;
  const groupId = req.params.id;

  try {
    if (!id || !groupId) {
      return res.status(400).json({ message: "User ID and Group ID are required" });
    }

    const [membership] = await pool.query("SELECT role FROM user_groups WHERE user_id = ? AND group_id = ?", [id, groupId]);

    if (membership.length === 0) {
      return res.status(403).json({ message: "You are not a member of this group" });
    }

    if (membership[0].role !== "admin") {
      return res.status(403).json({ message: "You are not an admin of this group" });
    }

    const [groups] = await pool.query("SELECT id FROM groups WHERE id = ?", [groupId]);

    if (groups.length === 0) {
      return res.status(404).json({ message: "Group not found" });
    }

    await pool.query("DELETE FROM groups WHERE id = ?", [groupId]);
    return res.status(200).json({ message: "Group deleted successfully" });


  } catch (error) {
    console.error("Error deleting group:", error);
    return res.status(500).json({ message: "Server error" });

  }
};

export default deleteGroup;
