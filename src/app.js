const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.use(express.json());

app.post("/signup", async (req, res) => {
  // Creating a new instance of the User model
  const user = new User(req.body);
  try {
    await user.save();
    res.send("User added successfully");
  } catch (error) {
    res.status(400).send("Error saving user" + error.message);
  }
});

// Get user by email
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const user = await User.findOne({
      emailId: userEmail,
    });
    if (!user) {
      res.status(404).send("User not found");
    } else {
      res.send(user);
    }
    // const users = await User.find({ emailId: userEmail });
    // if (users.length === 0) {
    //   res.status(404).send("User not found");
    // } else {
    //   res.send(users);
    // }
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
});

// Feed API - GET /feed - get all the users from the database
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length === 0) {
      res.status(404).send("User not found");
    } else {
      res.send(users);
    }
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
});

app.patch("/user/:userId", async (req, res) => {
  const userId = req.params.userId;
  const data = req.body

  try {
    const ALLOWED_UPDATES = [
      "photoUrl", "about", "gender", "age", "userId", "skills"
    ]
  
    const isUpdateAllowed = Object.keys(data).every(k => ALLOWED_UPDATES.includes(k))
  
    if(!isUpdateAllowed){
      throw new Error("Update not allowed");
    }

    if(data?.skills?.length > 10){
      throw new Error("Skills cannot be more than 10");
    }

    await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: 'after',
      runValidators: true
    })
    res.send('User updated')
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
})

app.delete('/user', async (req, res) => {
  const userId = req.body.userId
  try {
    await User.findByIdAndDelete(userId)
    res.send('User deleted')
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
})

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
