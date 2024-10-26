const express = require("express");

const app = express();

// GET /users => middleware chains => request handler

app.use("/", (req, res, next) => {
  // Middleware
  console.log("Handling / route");
  next();
});
app.get(
  "/user",
  (req, res, next) => {
    // Middleware
    console.log("Handling /user 1 route");
    next();
  },
  (req, res, next) => {
    console.log("Handling /user 2 route");
    res.send("user");
  }
);

app.listen(3000, () => {
  console.log("SERVER RUNNING");
});
