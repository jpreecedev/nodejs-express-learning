var http = require("http");
var xml2js = require("xml2js");
var parser = xml2js.Parser({
    explicityArray: false
});

var goodreadsService = function () {

    var getBookById = function (id, cb) {
        debugger;
        var options = {
            host: "www.goodreads.com",
            path: "/book/show/" + id + "?key=9EthYJLv4WwGttboseVv9Q&format=xml"
        };
        var callback = function (response) {
            var str = "";

            response.on("data", function (chunk) {
                str += chunk;
            });
            response.on("end", function () {
                parser.parseString(str, function (err, result) {
                    cb(null, result.GoodreadsResponse.book[0]);
                });
            })
        };

        http.request(options, callback).end();

    };

    return {
        getBookById: getBookById
    };
};

module.exports = goodreadsService;