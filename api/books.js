const express = require("express");
const { getBooks, getBook } = require("../db/books");

// create a router object for the /books routes

const bookRouter = express.Router();

// {baseUrl}/api/books
bookRouter.get("/", async (req, res) => {
  try {
    const results = await getBooks();
    res.send(results);
  } catch (err) {
    res.send({ err, message: "Something went wrong" });
  }
});

// {baseUrl}/api/books/:id
bookRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await getBook(id);
    res.send(result);
  } catch (err) {
    res.send({ err, message: "Something went wrong" });
  }
});

module.exports = bookRouter;