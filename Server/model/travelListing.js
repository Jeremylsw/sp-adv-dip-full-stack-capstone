// Imports
var dbConfig = require('./databaseConfig')
var config = require('../config')

// Object to handle all public travel listing API
var travelListing = {

    // Admin to insert itinerary listing
    insertListing: function (title, category, description, price, country,
        travelPeriod, ImageURL, DateInserted, callback) {
        // Connect to database
        var dbConn = dbConfig.getConnection();
        dbConn.connect(function (err) {
            // If error in connection
            if (err) {
                // Return error message
                return callback(err, null)
            }
            //Successful connection, proceed to post listing
            else {
                //Successful connection, proceed to query
                var sql = "INSERT INTO travel_listing (title, description, price, country, category,\
                        travelPeriod, ImageURL, DateInserted) VALUES(?,?,?,?,?,?,?,?)";
                dbConn.query(sql, [title, description, price, country, category,
                    travelPeriod, ImageURL, DateInserted], function (err, result) {
                        dbConn.end();
                        if (err) {
                            return callback(err, null);
                        } else {
                            return callback(null, { travelID: result.insertId });
                        }
                    });
            }
        })
    },

    // Update listing that is already in the 
    updateListing: function (title, description, price, country, category,
        travelPeriod, ImageURL, DateInserted, callback) {
        // Connect to database
        var dbConn = dbConfig.getConnection();
        dbConn.connect(function (err) {
            // If error in connection
            if (err) {
                // Return error message
                return callback(err, null)
            }
            //Successful connection, proceed to post listing
            else {
                //Successful connection, proceed to query
                var sql = "UPDATE travel_listing SET description = ?, price = ?, country = ?, category = ?,\
                    travelPeriod = ?, ImageURL = ?, DateInserted = ? WHERE title = ?";
                dbConn.query(sql, [description, price, country, category,
                    travelPeriod, ImageURL, DateInserted, title], function (err, result) {
                        dbConn.end();
                        if (err) {
                            return callback(err, null);
                        } else {
                            return callback(null, result);
                        }
                    });
            }
        })
    },

    // Save listing to archive
    archiveListing: function (dateArchived, adminID, adminName, title, description, price, country,
        travelPeriod, ImageURL, callback) {
        // Connect to database
        var dbConn = dbConfig.getConnection();
        dbConn.connect(function (err) {
            // If error in connection
            if (err) {
                // Return error message
                return callback(err, null)
            }
            //Successful connection, proceed to post listing
            else {
                //Successful connection, proceed to query
                var sql = "INSERT INTO travel_listing_archive (dateArchived, adminID, adminName, \
                    title, description, price, country, \
                    travelPeriod, ImageURL) VALUES(?,?,?,?,?,?,?,?,?)";
                dbConn.query(sql, [dateArchived, adminID, adminName,
                    title, description, price, country,
                    travelPeriod, ImageURL], function (err, result) {
                        dbConn.end();
                        if (err) {
                            return callback(err, null);
                        } else {
                            return callback(null, result);
                        }
                    });
            }
        })
    },


    getListingByTitle: function (title, callback) {
        // Connect to database
        var dbConn = dbConfig.getConnection()
        dbConn.connect(function (err) {
            // If error in connection
            if (err) {
                return callback(err, null)
            }
            //Successful connection, proceed to query
            else {
                var sql = "SELECT * FROM travel_listing where title=?";
                dbConn.query(sql, [title], function (err, result) {
                    dbConn.end();
                    if (result.length == 0) {
                        return callback('{"Error 204":"No Entry Found"}', null);
                    } else {
                        return callback(null, result);
                    }
                });
            }
        })
    },

    getListingByID: function (listingID, callback) {
        // Connect to database
        var dbConn = dbConfig.getConnection()
        dbConn.connect(function (err) {
            // If error in connection
            if (err) {
                // console.log(err);
                return callback(err, null)
            }
            //Successful connection, proceed to query
            else {
                var sql = "SELECT * FROM travel_listing where travelID=?";
                dbConn.query(sql, [listingID], function (err, result) {
                    dbConn.end();
                    if (result.length == 0) {
                        return callback('{"Error 204":"No Entry Found"}', null);
                    } else {
                        return callback(null, result);
                    }
                });
            }
        })
    },

    getAllListings: function (callback) {
        // Connect to database
        var dbConn = dbConfig.getConnection()
        dbConn.connect(function (err) {
            // If error in connection
            if (err) {
                return callback(err, null)
            }
            //Successful connection, proceed to query
            else {
                var sql = "SELECT * FROM travel_listing";
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
    },

    getListingBySSorCountry: function (substring, country, callback) {
        // Connect to database
        var dbConn = dbConfig.getConnection()
        dbConn.connect(function (err) {
            // If error in connection
            if (err) {
                return callback(err, null)
            }
            //Successful connection, proceed to query
            else {
                var sql = "SELECT * \
                    FROM travel_listing \
                    WHERE (description LIKE ? OR country LIKE ?) \
                    ORDER BY price ASC;";
                dbConn.query(sql, ['%' + substring + '%', country], function (err, result) {
                    dbConn.end();
                    if (err) {
                        return callback(err, null);
                    } else {
                        return callback(null, result);
                    }
                });
            }
        })
    },

    saveListingToArchive: function (callback) {
        // Connect to database
        var dbConn = dbConfig.getConnection()
        dbConn.connect(function (err) {
            // If error in connection
            if (err) {
                // console.log(err);
                return callback(err, null)
            }
            //Successful connection, proceed to query
            else {
                var sql = "SELECT * \
                    FROM travel_listing \
                    WHERE (description LIKE ? OR country LIKE ?) \
                    ORDER BY price ASC;";
                dbConn.query(sql, ['%substring%', country], function (err, result) {
                    dbConn.end();
                    if (err) {
                        return callback(err, null);
                    } else {
                        return callback(null, result);
                    }
                });
            }
        })
    },

    rmListing: function (listingID, callback) {
        // Connect to database
        var dbConn = dbConfig.getConnection()
        dbConn.connect(function (err) {
            // If error in connection
            if (err) {
                // console.log(err);
                return callback(err, null)
            }
            //Successful connection, proceed to query
            else {
                var sql = "DELETE FROM travel_listing WHERE travelID = ?";
                dbConn.query(sql, [listingID], function (err, result) {
                    dbConn.end();
                    if (err) {
                        return callback(err, null);
                    } else {
                        // No available data to be removed
                        if (result.affectedRows == 0) {
                            return callback('{"Error 204":"No Entry Found"}', null);
                        } else {
                            return callback(null, result);
                        }
                    }
                });
            }
        })
    },

    deleteListingsByIds: function (ids, callback) {
        // Connect to database
        var dbConn = dbConfig.getConnection();
        dbConn.connect(function (err) {
            // If error in connection
            if (err) {
                // console.log(err);
                return callback(err, null);
            }
            // Successful connection, proceed to query
            else {
                // Construct the SQL query to delete listings by IDs
                // The '?' placeholder will be replaced by the array of IDs in the query execution
                var sql = "DELETE FROM travel_listing WHERE travelID IN (?)";

                dbConn.query(sql, [ids], function (err, result) {
                    dbConn.end();
                    if (err) {
                        // console.log(err);
                        return callback(err, null);
                    } else {
                        // Check if any rows were affected
                        if (result.affectedRows === 0) {
                            return callback('{"Error 204":"No Entries Found"}', null);
                        } else {
                            return callback(null, { "message": "Successfully deleted listings", "deletedRows": result.affectedRows });
                        }
                    }
                });
            }
        });
    },

}
module.exports = travelListing;
