const express = require("express");

const router = express.Router();

const {
  getNominees,
  getNomineeById,
  voteForNominee,
} = require("../controllers/nomineeController");

router.get("/", getNominees);

router.get("/:id", getNomineeById);

router.post("/:id/vote", voteForNominee);

module.exports = router;