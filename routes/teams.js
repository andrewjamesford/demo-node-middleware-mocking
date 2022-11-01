const express = require("express");
const router = express.Router();
const {
  checkJwt,
  checkScopes,
} = require("../middleware/authorisationMiddleware");


// GET teams listings.
router.get("/", checkJwt, checkScopes, async (req, res, next) => {
  try {
    return res.json("Teams");
  } catch (err) {
    next(err);
  }
});

// Demonstrate throwing an error
router.get("/error", async (req, res, next) => {
  try {
    throw new Error("I'm an error");
  } catch (err) {
    next(err);
  }
});

// Demonstrate a 404
router.get("/nonexistant", (req, res, next) => {
  try {
    res.status(404).json("Not Found");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
