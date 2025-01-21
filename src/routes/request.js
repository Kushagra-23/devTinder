const express = require("express");
const { userAuth } = require("../middlewares/auth");

const requireRouter = express.Router();

requireRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
  try {
    res.send(req.user.firstName + " Connection Request Sent");
  } catch (error) {
    res.status(400).send("ERROR : " + error.message);
  }
});

module.exports = requireRouter;
