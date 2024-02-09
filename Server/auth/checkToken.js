var jwt = require('jsonwebtoken');
var config = require('../config')

var jwtUtil = {

    // Check if token is valid
    verifyToken: function (req, res, next) {
        var headerToken = req.headers['authorization'];
        if (headerToken && headerToken.includes("Bearer")) {
            token = headerToken.split(" ")[1];
            jwt.verify(token, config.secretKey, function (err, decoded) {
                if (err) {
                    res.status(401)
                    return res.send('{"Error 401":"Unauthorized access"}');
                } else {
                    // Since no roles in this scenario 
                    req.authenticated = "Authenticated";
                    req.adminID = decoded.adminID;
                    req.adminName = decoded.adminName;
                    next();
                }
            })
        } else {
            res.status(500);
            return res.send('{"Error 500":"No Token Entered"}');
        }
    }



}

module.exports = jwtUtil;