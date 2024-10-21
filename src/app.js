const express = require('express');

const app = express();

app.use('/', (req, res) => {
  res.send("Namaste from server")
}) // this function is known as request handler

app.use('/hello', (req, res) => {
  res.send("Hello from server")
})

app.use('/test', (req, res) => {
  res.send("Hello test from server")
})

app.listen(3000, () => {
  console.log("SERVER RUNNING")
})