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

const voteForNominee = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "UPDATE nominees SET votes = votes + 1 WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Nominee not found",
      });
    }

    res.json({
      message: "Vote submitted successfully",
      nominee: result.rows[0],
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
  voteForNominee,
};