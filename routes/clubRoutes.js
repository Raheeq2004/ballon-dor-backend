const express = require("express");
const router = express.Router();

const {
  getFeaturedClubs,
} = require("../controllers/clubController");

router.get("/", getFeaturedClubs);

module.exports = router;