// Imports
var dbConfig = require('./databaseConfig');

// Object to handle all archived travel listings API
var travelListingArchive = {

    // Get all listings from archive
    getAllListingsFromArchive: function (callback) {
        // Connect to database
        var dbConn = dbConfig.getConnection();
        dbConn.connect(function (err) {
            // If error in connection
            if (err) {
                return callback(err, null)
            }
            // Successful connection, proceed to query
            else {
                var sql = "SELECT * FROM travel_listing_archive";
                dbConn.query(sql, function (err, result) {
                    dbConn.end();
                    if (err) {
                        return callback(err, null);
                    } else {
                        return callback(null, result);
                    }
                });
            }
        })
    }

}

module.exports = travelListingArchive;
