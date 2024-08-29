const express = require("express");
const apiRouter = express.Router();
const jwt = require("jsonwebtoken");
const { getUserById } = require("../db/users");

apiRouter.use((req, res, next) => {
  const auth = req.header('Authorization');
  const prefix = 'Bearer';
  if(!auth) {
    next();
  } else if (auth.startsWith(prefix)) {
    console.log(auth);
    console.log("it looks ok");
  }
  next();
});

// register routes for requests that have form {baseUrl}/api/books
apiRouter.use("/books", require("./books"));

// registers routes for requests of form {baseUrl}/api/users
apiRouter.use("/users", require("./users"));

// baseurl/api
apiRouter.get("/", (req, res) => {
  res.send("Hello from /api");
});

module.exports = apiRouter;