var mongoose = require('mongoose');

var BookSchema = mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String
    },
    genre: {
        type: String
    },
    price: {
        type: Number
    },
    author: {
        type: String
    },
    releasedate: { type: Date, default: Date.now }
});

var Book = module.exports = mongoose.model('Book', BookSchema);

module.exports.createBook = function (newBook, callback) {
    // console.log(newBook);
    newBook.save(callback);
}

module.exports.getAllBooks = function (callback) {
    Book.find(callback);
}



module.exports.getBookByBookname = function (bookname, callback) {
    var query = { bookname: bookname };
    Book.findOne(query, callback);
}

module.exports.getBookById = function (id, callback) {
    Book.findById(id, callback);
}

module.exports.getBookByFbId = function (id, callback) {
    Book.find({ fb_id: id }).exec(function (err, data) {
        if (err) return handleError(err);
        callback(data);

    });
}

module.exports.remove = function (id, callback) {
    Book.findById(id).remove(callback);
}

module.exports.updateBook = function (id, data, callback) {
    Book.findOneAndUpdate(id, data, { returnNewDocument: true })
    callback(null, data);
}
