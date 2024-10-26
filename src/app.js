const express = require('express');

const app = express();

// app.use('/route', rH1, [rH2, rH3], rH4, rH5);

app.use("/user", (req, res, next) => {
  console.log("first")
  next();
},
(req, res, next) => {
  console.log("second")
  next();
},
(req, res, next) => {
  console.log("third")
  next();
},
(req, res, next) => {
  console.log("fourth")
  next();
},
(req, res, next) => {
  console.log("fifth")
  res.send("5") 
})

app.listen(3000, () => {
  console.log("SERVER RUNNING")
})