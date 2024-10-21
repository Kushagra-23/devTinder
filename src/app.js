const express = require('express');

const app = express();

app.get("/ab?c", (req, res) => {
  res.send({ firstName: "Kushagra", lastName: 'Kumar' })
}) // It will work for /ac, /abc

app.get("/ab+c", (req, res) => {
  res.send({ firstName: "Kushagra", lastName: 'Kumar' })
}) // It will work for /abc, /abbc, /abbbbc 

app.get("/ab*cd", (req, res) => {
  res.send({ firstName: "Kushagra", lastName: 'Kumar' })
}) // It will work for /abKUSHAGRAcd, /ab1234c

app.get("/a(bc)?d", (req, res) => {
  res.send({ firstName: "Kushagra", lastName: 'Kumar' })
}) // It will work for /ad and /abcd

app.get(/a/, (req, res) => {
  res.send({ firstName: "Kushagra", lastName: 'Kumar' })
}) // Regex expressions

app.get("/user/:id", (req, res) => {
  res.send({ firstName: "Kushagra", lastName: 'Kumar' })
}) // Dynamic routes

app.listen(3000, () => {
  console.log("SERVER RUNNING")
})