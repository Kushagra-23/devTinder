const express = require("express");

const app = express();

const { adminAuth } = require('./middlewares/auth');

app.use('/admin', adminAuth)

app.get(
  "/admin/getAllData",
  (req, res, next) => {
    res.send("All Data Sent")
  }
);

app.get(
  "/admin/deleteUser",
  (req, res, next) => {
    res.send("Deleted User")
  }
);

app.listen(3000, () => {
  console.log("SERVER RUNNING");
});
