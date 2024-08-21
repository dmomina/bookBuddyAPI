const express = require("express");
const userRouter = express.Router();

// {baseUrl}/users/me
userRouter.get("/me", (req, res) => {
  res.send("here is your account info");
});

// POST request to {baseUrl}/api/users/register
userRouter.post("/register", (req, res) => {
  console.log("REQUEST BODY", req.body);
  res.send("User registered");
});

userRouter.post("/login", (req, res) => {
  console.log("REQUEST BODY", req.body);
  res.send("You logged in successfully!");
});

module.exports = userRouter;