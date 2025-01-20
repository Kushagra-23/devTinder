const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const validator = require("validator");
const cookieParser = require("cookie-parser");
const { userAuth } = require("./middlewares/auth");

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
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
    await user.save();
    res.send("User added successfully");
  } catch (error) {
    res.status(400).send("ERROR : " + error.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    if (!validator.isEmail(emailId)) {
      throw new Error("Invalid credentials");
    }
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const isPasswordValid = await user.validatePassword(password)
    if (isPasswordValid) {
      // Create a JWT Token
      const token = await user.getJWT();
      // Add the token to cookie and send the response back to the user
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 + 36000000),
      });
      res.send("Login Successful");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    res.status(400).send("ERROR : " + error.message);
  }
});

app.get("/profile", userAuth, async (req, res) => {
  try {
    res.send(req.user);
  } catch (error) {
    res.status(400).send("ERROR : " + error.message);
  }
});

app.post("/sendConnectionRequest", userAuth, async (req, res) => {
  try {
    res.send(req.user.firstName + " Connection Request Sent");
  } catch (error) {
    res.status(400).send("ERROR : " + error.message);
  }
});

connectDB()
  .then(() => {
    console.log("Database connection success");
    app.listen(3000, () => {
      console.log("SERVER RUNNING");
    });
  })
  .catch(() => {
    console.log("Database cannot be connected");
  });
