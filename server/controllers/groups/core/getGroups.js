import pool from "../../../db/pool.js";

const getGroups = async (req, res) => {
  const id = req.user.id;
  const { groupId } = req.params;
  try {
    if (!id) return res.status(400).json({ message: "Not authorized" });

    const [group] = await pool.query("SELECT id FROM groups WHERE id = ?", [groupId]);

    if (group.length === 0) {
      return res.status(404).json({ message: "Group not found" });
    }

    return res.status(200).json({ group });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default getGroups;
