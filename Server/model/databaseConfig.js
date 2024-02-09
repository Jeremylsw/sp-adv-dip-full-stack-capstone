var mysql = require('mysql');

// Connect to assignment 1 database
var dbconnect = {
    getConnection: function () {
        var conn = mysql.createConnection({
            host: "mydatabase.cxacgmocie5o.us-east-1.rds.amazonaws.com",
            user: "admin",
            password: "admin123",
            database: "travel_assignment1"
        });
        return conn;
    }
};
module.exports = dbconnect
