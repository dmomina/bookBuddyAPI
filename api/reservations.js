const express = require("express");
const reservationsRouter = express.Router();

const { requireUser } = require("./utils");

const {
  getReservation,
  deleteReservation,
  updateBook,
  getBook,
} = require("../db");

reservationsRouter.get("/", (req, res) => {
  res.send("hello from reservations");
});

reservationsRouter.delete("/:id", async (req, res, next) => {
  try {
    // first check if a reservation with that id exists
    const reservation = await getReservation(req.params.id);
    console.log("RESERVATION", reservation);

    // if not, throw an error with message - reservation does not exist - STOP
    if (!reservation) {
      next({
        name: "ReservationDoesNotExist",
        message: "Nothing to return here...",
      });
      return;
    } else if (req.user.id !== reservation.userid) {
      // IF reservation is there, check the reservation's userid against the logged-in user's id
      // -- If they don't match, throw an error - not authorized to return this book
      next({
        name: "Permission Denied",
        message: "You do not have permission to return this book",
      });
      return;
    } else {
      // -- if they DO match, two things - delete the reservation (using deleteReservation function), confirm
      // ---that the deletion was successful AND THEN update the book to be available again (set available:true);
      const deletedReservation = await deleteReservation(req.params.id);
      console.log(deleteReservation);
      const book = await getBook(deletedReservation.bookId);
      if (deletedReservation) {
        updateBook(book.id, true);
      }
      res.send({ deletedReservation });
    }

    res.send("deleted");
  } catch (err) {
    next(err);
  }
});

module.exports = reservationsRouter;