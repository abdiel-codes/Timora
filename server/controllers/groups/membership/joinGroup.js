import pool from "../../../db/pool.js";

const joinGroup = async (req, res) => {
  const id = req.user.id;
  const { groupId, requestId } = req.params;

  try {
    if (!groupId || !requestId) return res.status(400).json({ message: "Missing group id or request id" });

    if (!id) return res.status(400).json({ message: "Not authorized" });

    const [membership] = await pool.query("SELECT role FROM group_users WHERE user_id = ? AND group_id = ?", [id, groupId]);

    if (membership.length === 0 || membership[0].role === "admin") {
      return res.status(403).json({ message: "Only admin accept requests" });
    }

    const [request] = await pool.query("SELECT * FROM group_requests WHERE id = ? AND group_id = ?", [requestId, groupId]);

    if (request.length === 0) {
      return res.status(404).json({ message: "Request not found" });
    }

    if (request[0].status !== "pending") {
      return res.status(400).json({ message: "Request already accepted" });
    }

    const userToAdd = request[0].user_id;

    await pool.query("INSERT INTO group_users (user_id, group_id, role) VALUES (?, ?, ?)", [userToAdd, groupId, "member"]);

    await pool.query("UPDATE group_requests SET status = 'accepted' WHERE id = ?", [requestId]);

    return res.status(200).json({ message: "User joined successfully" });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default joinGroup;
