const express = require('express');

const app = express();

// This will only handle GET call to /user
app.get("/user", (req, res) => {
  res.send({ firstName: "Kushagra", lastName: 'Kumar' })
})

// This will only handle POST call to /user
app.post("/user", (req, res) => {
  console.log("Saved data to database")
  res.send('Data saved successfully')
})

// This will only handle DELETE call to /user
app.delete("/user", (req, res) => {
  console.log("Deleted data to database")
  res.send('Data deleted successfully')
})

// This will match all the HTTP method API calls to /test
app.use('/test', (req, res) => {
  res.send("Hello test from server")
})

app.listen(3000, () => {
  console.log("SERVER RUNNING")
})