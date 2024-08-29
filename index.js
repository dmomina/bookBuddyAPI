const express = require("express");
const app = express();
require("dotenv").config();

const client = require("./db/client");
client.connect();
const PORT = 3000;

app.use(express.json());

// we're registering the routes in /api/index.js ===> IOW, request to /api ---> send request to /api/index.js
app.use("/api", require("./api"));

app.get("/", (req, res) => {
  res.send("Hello from our server");
});

app.use((error, req, res, next) => {
  console.log("ERROR", error);
  res.send({
    message: "SOMETHING WENT WRONG",
  });
});

app.listen(PORT, () => {
  console.log(`Server alive on port ${PORT}`);
});