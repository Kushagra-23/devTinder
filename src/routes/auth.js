const express = require("express");
const { validateSignUpData } = require("../utils/validation");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const validator = require("validator");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    // Validation of data
    validateSignUpData(req);
    const { firstName, lastName, emailId, password } = req.body;
    // Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);
    // Creating a new instance of the User model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    const savedUser = await user.save();
    const token = await savedUser.getJWT();
    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 + 36000000),
    });
    res.json({ message: "User added successfully", data: savedUser });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    if (!validator.isEmail(emailId)) {
      throw new Error("Invalid credentials");
    }
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      // Create a JWT Token
      const token = await user.getJWT();
      // Add the token to cookie and send the response back to the user
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 + 36000000),
      });
      res.json({ message: "Login successfully", data: user });
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

authRouter.post("/logout", async (req, res) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
    });
    res.json({ message: "Logout Successful" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = authRouter;
