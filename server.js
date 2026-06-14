const nomineeRoutes = require("./routes/nomineeRoutes");

const authRoutes = require("./routes/authRoutes");

const clubRoutes = require("./routes/clubRoutes");

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const pool = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/nominees", nomineeRoutes);

app.use("/api/clubs", clubRoutes);

app.get("/", (req, res) => {
  res.send("Ballon d'Or Backend API is running");
});

const PORT = process.env.PORT || 5000;


pool.connect()
  .then(() => {
    console.log("PostgreSQL connected successfully");
  })
  .catch((err) => {
    console.error("Database connection error:", err.message);
  });


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});