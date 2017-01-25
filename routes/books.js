var express = require('express');
var router = express.Router();
var cookieParser = require('cookie-parser')
  , config = require('../config/config')
var Book = require('../models/books');

router.get('/id/:id', function (req, res) {
  var id = req.params.id;
  console.log('id here');
  console.log(id);
  Book.getBookById(id, function (err, book) {
    res.json(book);
  });
});

router.post('/', function (req, res) {
  var newBook = new Book({
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre,
    price: req.body.price,
    releasedate: req.body.releasedate,
  });
  Book.createBook(newBook, function (err, book) {
    if (err) throw err;
    return res.json(book);
  });
});

router.get('/', function (req, res) {
  Book.getAllBooks(function (err, docs) {
    console.log(docs);
    res.json(docs);
  });
});

router.delete('/id/:id', function (req, res) {
  var id = req.params.id;
  Book.remove(id, function (err, book) {
    res.json(book);
  });
});

router.put('/id/:id', function (req, res) {
  var id = req.params.id;
  Book.update({ _id: id },
    {
      title: req.body.title, genre: req.body.genre, author: req.body.author,
      price: req.body.price, releasedate: req.body.releasedate
    }
    , function (err, doc) {
      if (err) return res.status(500).send({ error: err });
      return res.json(doc);
    });
});

module.exports = router;
