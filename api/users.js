const express = require("express");
const userRouter = express.Router();
const { getUserById, getUsers } = require("../db/users");

userRouter.get("/", async (req, res) => {
  try {
    const results = await getUsers();
    res.send(results);
  } catch (err) {
    res.send({ err, message: "something went wrong" });
  }
});

// {baseUrl}/users/id
userRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await getUserById(id);
    res.send(result);
  } catch (err) {
    res.send({ err, message: "something went wrong" });
  }
});

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