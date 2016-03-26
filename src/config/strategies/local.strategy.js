var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var mongodb = require("mongodb").MongoClient;

module.exports = function () {
    "use strict";

    passport.use(new LocalStrategy({
        usernameField: "userName",
        passwordField: "password"
    }, function (username, password, done) {
        var url = "mongodb://localhost:27017/libraryApp";

        mongodb.connect(url, function (err, db) {
            var collection = db.collection("users");
            collection.findOne({
                username: username
            }, function (err, results) {
                if (results.password === password) {
                    done(null, results);
                } else {
                    done(null, false);
                }
            });
        });
    }));
};