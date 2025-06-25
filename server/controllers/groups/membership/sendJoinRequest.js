import pool from "../../../db/pool.js";

const sendJoinRequest = async (req, res) => {
  const id = req.user.id;
  const { groupId } = req.params;

  try {
    if (!groupId) return res.status(400).json({ message: "Missing group id" });

    if (!id) return res.status(400).json({ message: "Not authorized" });

    const [membership] = await pool.query("SELECT role FROM group_users WHERE user_id = ? AND group_id = ?", [id, groupId]);

    if (membership.length > 0) {
      return res.status(403).json({ message: "You are already in this group" });
    }

    const [existingRequest] = await pool.query("SELECT id, status FROM group_requests WHERE user_id = ? AND group_id = ?", [id, groupId]);

    if (existingRequest.length > 0) {
      return res.status(400).json({ message: "You already have a pending request" });
    }

    const [group] = await pool.query("SELECT id FROM groups WHERE id = ?", [groupId]);

    if (group.length === 0) {
      return res.status(404).json({ message: "Group not found" });
    }

    await pool.query("INSERT INTO group_requests (user_id, group_id) VALUES (?, ?)", [id, groupId]);

    return res.status(201).json({ message: "Request sent successfully" });

  } catch (error) {
    console.error("Error sending join request:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default sendJoinRequest;
