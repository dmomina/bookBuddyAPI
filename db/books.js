const client = require("./client");

const createBook = async ({ title, author, description, coverImage, available }) => {
    try {
        const SQL = `INSERT INTO books(title, author, description, coverImage, available) VALUES($1, $2, $3, $4, $5) RETURNING *`;
        const {
            rows:[book]
        } = await client.query(SQL, [title, author, description, coverImage, available]);
        console.log(book);
        return book;
    } catch (err) {
        console.log(err);
    }
};

module.exports = { createBook };
