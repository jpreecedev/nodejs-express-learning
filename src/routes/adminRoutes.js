var express = require("express");
var adminRouter = express.Router();
var mongodb = require("mongodb").MongoClient;

var books = [{
    title: "The Martian",
    genre: "Science Fiction",
    author: "Andy Wier",
    read: false,
    bookId: 18007564
    }, {
    title: "The Time Machine",
    genre: "Science Fiction",
    author: "H. G. Wells",
    read: false,
    bookId: 2493
    }];

var router = function (nav) {

    adminRouter.route("/addBooks")
        .get(function (req, res) {

            var url = "mongodb://localhost:27017/libraryApp";
            mongodb.connect(url, function (err, db) {
                var collection = db.collection("books");
                collection.insertMany(books, function (err, results) {
                    res.send(results);
                    db.close();
                });
            });
        });

    return adminRouter;
};

module.exports = router;