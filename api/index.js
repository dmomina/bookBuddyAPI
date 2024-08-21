const express = require("express");

const apiRouter = express.Router();
// register routes for requests that have form {baseUrl}/api/books
apiRouter.use("/books", require("./books"));

// registers routes for requests of form {baseUrl}/api/users
apiRouter.use("/users", require("./users"));

// baseurl/api
apiRouter.get("/", (req, res) => {
  res.send("Hello from /api");
});

module.exports = apiRouter;