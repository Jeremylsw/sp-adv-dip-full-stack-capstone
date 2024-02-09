// Imports
var dbConfig = require('./databaseConfig')
var config = require('../config')

// Object to handle all public itinerary API
var itinerary = {

    addItinerary: function (travelID, day, activity, callback) {
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
                var sql = "INSERT INTO itinerary (day, activity, travelID) \
                        VALUES(?,?,?)";
                dbConn.query(sql, [day, activity, travelID], function (err, result) {
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

    rmItinerary: function (travelID, day, callback) {
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
                var sql = "DELETE FROM itinerary WHERE day = ? and travelID = ?";
                dbConn.query(sql, [day, travelID], function (err, result) {
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

    rmItineraryByTravelID: function (travelID, callback) {
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
                var sql = "DELETE FROM itinerary WHERE travelID = ?";
                dbConn.query(sql, [travelID], function (err, result) {
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

    getItineraryByTravelID: function (travelID, callback) {
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
                var sql = "SELECT * FROM itinerary where travelID=?";
                dbConn.query(sql, [travelID], function (err, result) {
                    dbConn.end();
                    if (err) {
                        return callback(err, null);
                    } else if (result.length == 0) {
                        return callback('{"Error 204":"No Entry Found"}', null);
                    } else {
                        return callback(null, result);
                    }
                });
            }
        })
    },

    updateItinerary: function (day, activity, travelID, itineraryID, callback) {
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
                //Successful connection, proceed to query
                var sql = "UPDATE itinerary SET day = ?, activity = ?,\
                    travelID = ? WHERE ItineraryId = ?";
                dbConn.query(sql, [day, activity, travelID, itineraryID], function (err, result) {
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

    getItineraryByItineraryID: function (itineraryID, callback) {
        // Connect to database
        var dbConn = dbConfig.getConnection()
        dbConn.connect(function (err) {
            // If error in connection
            if (err) {
                return callback(err, null)
            }
            //Successful connection, proceed to query
            else {
                var sql = "SELECT * FROM itinerary where itineraryID=?";
                dbConn.query(sql, [itineraryID], function (err, result) {
                    dbConn.end();
                    if (err) {
                        return callback(err, null);
                    } else if (result.length == 0) {
                        return callback('{"Error 204":"No Entry Found"}', null);
                    } else {
                        return callback(null, result);
                    }
                });
            }
        })
    }




}
module.exports = itinerary;