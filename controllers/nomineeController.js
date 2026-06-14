const pool = require("../config/db");

const getNominees = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM nominees ORDER BY id ASC"
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const getNomineeById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "SELECT * FROM nominees WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Nominee not found",
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const addNominee = async (req, res) => {
  try {
    const { name, category_id, club } = req.body;

    if (!name || !category_id || !club) {
      return res.status(400).json({
        message: "Name, category, and club are required",
      });
    }

    const result = await pool.query(
      `INSERT INTO nominees (name, category_id, club, votes)
       VALUES ($1, $2, $3, 0)
       RETURNING *`,
      [name, category_id, club]
    );

    res.status(201).json({
      message: "Nominee added successfully",
      nominee: result.rows[0],
    });
  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const updateNominee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category_id, club } = req.body;

    if (!name || !category_id || !club) {
      return res.status(400).json({
        message: "Name, category, and club are required",
      });
    }

    const result = await pool.query(
      `UPDATE nominees
       SET name = $1,
           category_id = $2,
           club = $3
       WHERE id = $4
       RETURNING *`,
      [name, category_id, club, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Nominee not found",
      });
    }

    res.json({
      message: "Nominee updated successfully",
      nominee: result.rows[0],
    });
  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const deleteNominee = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query(
      "DELETE FROM votes WHERE nominee_id = $1",
      [id]
    );

    const result = await pool.query(
      "DELETE FROM nominees WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Nominee not found",
      });
    }

    res.json({
      message: "Nominee deleted successfully",
      nominee: result.rows[0],
    });
  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const voteForNominee = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id } = req.body;

    if (!user_id) {
      return res.status(400).json({
        message: "User ID is required",
      });
    }

    const nomineeResult = await pool.query(
      "SELECT * FROM nominees WHERE id = $1",
      [id]
    );

    if (nomineeResult.rows.length === 0) {
      return res.status(404).json({
        message: "Nominee not found",
      });
    }

    const nominee = nomineeResult.rows[0];

    const existingVote = await pool.query(
      `SELECT v.*
       FROM votes v
       JOIN nominees n ON v.nominee_id = n.id
       WHERE v.user_id = $1
       AND n.category_id = $2`,
      [user_id, nominee.category_id]
    );

    if (existingVote.rows.length > 0) {
      return res.status(400).json({
        message: "You already voted in this category",
      });
    }

    await pool.query(
      "INSERT INTO votes (user_id, nominee_id) VALUES ($1, $2)",
      [user_id, id]
    );

    const updatedNominee = await pool.query(
      "UPDATE nominees SET votes = votes + 1 WHERE id = $1 RETURNING *",
      [id]
    );

    res.json({
      message: "Vote submitted successfully",
      nominee: updatedNominee.rows[0],
    });
  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  getNominees,
  getNomineeById,
  addNominee,
  updateNominee,
  deleteNominee,
  voteForNominee,
};