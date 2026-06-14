const express = require("express");

const router = express.Router();

const {
  getNominees,
  getNomineeById,
  addNominee,
  updateNominee,
  deleteNominee,
  voteForNominee,
} = require("../controllers/nomineeController");

router.get("/", getNominees);

router.post("/", addNominee);

router.get("/:id", getNomineeById);

router.put("/:id", updateNominee);

router.delete("/:id", deleteNominee);

router.post("/:id/vote", voteForNominee);

module.exports = router;