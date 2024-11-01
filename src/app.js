const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.post("/signup", async (req, res) => {
  // Creating a new instance of the User model
  const user = new User({
    firstName: "Kushagra",
    lastName: "Kumar",
    emailId: "kushagra@.com",
    password: "kushagra",
  });
  try {
    await user.save();
    res.send("User added successfully");
  } catch (error) {
    res.statusCode(400).send("Error saving user" + error.message);
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
