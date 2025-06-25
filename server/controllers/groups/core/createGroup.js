import pool from "../../../db/pool.js";

const createGroup = async (req, res) => {
  const { name } = req.body;
  const { id } = req.user;

  try {
    if (!name, name.trim() === "") {
      return res.status(400).json({ message: "Name is required" });
    }

    if (!id) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const [result] = await pool.query("INSERT INTO groups (name, created_by) VALUES (?, ?)", [name, id]);
    const groupId = result.insertId;

    await pool.query("INSERT INTO user_groups (user_id, group_id, role) VALUES (?, ?, 'admin')", [id, groupId]);

    return res.status(201).json({ message: "Group created successfully" });
  } catch (error) {
    console.error("Error creating group:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export default createGroup;
