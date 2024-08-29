const express = require("express");
const { getBooks, getBook, createBook, deleteBook, updateBook } = require("../db/books");

// create a router object for the /books routes

const bookRouter = express.Router();

// {baseUrl}/api/books
bookRouter.get("/", async (req, res, next) => {
  try {
    const results = await getBooks();
    res.send(results);
  } catch (err) {
    next(err);
  }
});

// {baseUrl}/api/books/:id
bookRouter.get("/:id", async (req, res, next) => {
  const id = Number(req.params.id);
  console.log(id);
  if(isNaN(id) || req.params.id === " ") {
    next({
      name: "Invalid ID Format",
      message: "The provided request parameter is not a valid book ID",
    });
    return;
  }
  try {
    const result = await getBook(id);
    if(!result){
      next({
        name: "Not Found",
        message: "No matching book found",
      });
    }
    res.send(result);
  } catch (err) {
    next(err);
  }
});

// {baseURL}/api.books
bookRouter.post("/", async (req,res) => {
  try {
    const result = await createBook(req.body);
    console.log(result);
    res.send(result);
  } catch (err) {
    res.send(err);
  } 
})

bookRouter.delete("/:id", async (req,res) => {
  try {
    const result = await deleteBook(req.params.id);
    console.log(result);
    res.send({ message:"book deleted successfully", id: result });
  } catch (err) {
    res.send(err);
  }
});

bookRouter.patch("/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if(isNaN(id) || req.params.id === " ") {
      next({
        name: "InvalidIDFormat",
        message: "The provided request parameter is not a valid book ID."
      });
      return;
    }
    const result = await getBook(id);
    if (result) {
      next({
        name: "Not Found",
        message: "No matching book found",
      });
      return;
    } else {
      const updated = await updateBook(req.params.id, req.body.available);
      if(updated) {
        res.send({ 
          message:"updated successfully", 
          updated, 
        });
      } else {
        next({
          name: "UpdatedError",
          message: "There was an errror updating this book.",
        });
        return;
      }
    }
  } catch (err) {
   next(err);
  }
})

module.exports = bookRouter;