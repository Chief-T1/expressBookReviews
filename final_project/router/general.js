const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (username && password) {
    if (!isValid(username)) {
      users.push({"username":username,"password":password});
      return res.status(300).json({message: "User successfully registered"});
    } else {
      return res.status(404).json({message: "User already exists!"});
    }
  }
  return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/', async function (req, res) {
  let bookList = JSON.stringify(books)
  return res.status(300).json({message: await bookList});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbnBook = new Promise((resolve, reject) => {let isbnBook = books[req.params.isbn]
    resolve(res.status(300).json({message: isbnBook}))
 })
 isbnBook.then(() => console.log("Promise for Task 11 resolved"));
});
  
// Get book details based on author
public_users.get('/author/:author', async function (req, res) {
    author = req.params.author
  authorBook = Object.values(books).filter(x => {return x.author == author})
  return res.status(300).json({message: await authorBook});
});

// Get all books based on title
public_users.get('/title/:title',async function (req, res) {
    title = req.params.title
    titleBook = Object.values(books).filter(x => {return x.title == title})
  return res.status(300).json({message: await titleBook});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  review = books[req.params.isbn].reviews
  return res.status(300).json({message: review});
});

module.exports.general = public_users;
