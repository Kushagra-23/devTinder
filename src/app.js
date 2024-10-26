const express = require("express");

const app = express();

app.get("/getUserData", (req, res, next) => {
  // try{
  //   throw new Error("ERROR");
  //   res.send("All Data Sent");
  // }catch (err){
  //   res.status(500).send("Error");
  // }
  throw new Error("ERROR");
  res.send("All Data Sent");
});

app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("Something went wrong");
  }
});

app.listen(3000, () => {
  console.log("SERVER RUNNING");
});
