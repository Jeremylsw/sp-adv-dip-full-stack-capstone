// Imports
var dbConfig = require('./databaseConfig')
var config = require('../config')
var jwt = require('jsonwebtoken')

// Object to handle all admin functions
var user = {

    adminLogin: function (email, password, callback) {
        // Connect to database
        var dbConn = dbConfig.getConnection();
        dbConn.connect(function (err) {
            // If error in connection
            if (err) {
                // console.log(err);
                // Return error message
                return callback(err, null)
            }
            //Successful connection, proceed to post listing
            else {
                //Successful connection, query user
                var sql = "SELECT * FROM admin WHERE email = ? and password = ?";
                dbConn.query(sql, [email, password], function (err, results) {
                    dbConn.end();
                    if (err) {
                        return callback(err, null);
                    } else {
                        // If valid user exists, generate jwt
                        if (results.length > 0) {
                            // Return only non sensitive info: name and adminID 
                            var adminID = results[0].adminID;
                            var adminName = results[0].Name;
                            var payload = { "adminID": adminID, "adminName": adminName };
                            // Generate JWT token that lasts for 1 hour
                            jwt.sign(payload, config.secretKey, { "expiresIn": 3600 }, function (err, encoded) {
                                if (!err) {
                                    token = encoded;
                                } return callback(null, token);
                            })
                        } else {
                            // Return 401 unauthorized as incorrect admin login
                            return callback('{"Error 401":"Unauthorized access"}', null);
                        }
                    }
                });
            }
        })
    },

    adminRegister: (email, name, password, callback) => {
        var dbConn = dbConfig.getConnection();
        dbConn.connect(err => {
            if (err) {
                return callback(err, null);
            } else {
                var sql = 'INSERT INTO admin (email, name, password) VALUES (?,?,?)';

                var token = "";
                dbConn.query(sql, [email, name, password], (err, results) => {
                    dbConn.end();

                    if (results && results.affectedRows > 0) {
                        var userId = results.insertId;

                        var payload = {
                            userId: userId,
                        };

                        token = jwt.sign(payload, config.secretKey, { expiresIn: 3600 });
                    }

                    callback(err, token);
                });
            }
        });
    }

}
module.exports = user;