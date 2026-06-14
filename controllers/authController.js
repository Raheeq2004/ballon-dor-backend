const pool = require("../config/db");

const registerUser = async (req, res) => {
  try {
    const { full_name, email, password } = req.body;

    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    const newUser = await pool.query(
      `INSERT INTO users (full_name, email, password)
       VALUES ($1, $2, $3)
       RETURNING id, full_name, email, role`,
      [full_name, email, password]
    );

    res.status(201).json({
      message: "User registered successfully",
      user: newUser.rows[0],
    });
  } catch (error) {
  console.error(error);

  res.status(500).json({
    message: "Server Error",
  });
}
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (user.rows.length === 0) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    if (user.rows[0].password !== password) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user.rows[0].id,
        full_name: user.rows[0].full_name,
        email: user.rows[0].email,
        role: user.rows[0].role,
      },
    });
  }catch (error) {
  console.error(error);

  res.status(500).json({
    message: "Server Error",
  });
}
};

module.exports = {
  registerUser,
  loginUser,
};