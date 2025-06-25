import pool from "../../../db/pool.js";

const getGroupRequests = async (req, res) => {
  const id = req.user.id;
  const { groupId } = req.params;

  try {
    if (!groupId) return res.status(400).json({ message: "Missing group id" });

    if (!id) return res.status(400).json({ message: "Not authorized" });

    const [group] = await pool.query("SELECT id FROM groups WHERE id = ?", [groupId]);

    if (group.length === 0) {
      return res.status(404).json({ message: "Group not found" });
    }

    const [membership] = await pool.query("SELECT role FROM group_users WHERE user_id = ? AND group_id = ?", [id, groupId]);

    if (membership.length === 0 || membership[0].role !== "admin") {
      return res.status(403).json({ message: "Only admin can get requests" });
    }


    const [requests] = await pool.query("SELECT * FROM group_requests WHERE group_id = ? AND status = 'pending' ORDER BY requested_at DESC", [groupId]);

    return res.status(200).json({ requests });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default getGroupRequests;

