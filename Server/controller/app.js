var express = require('express')
var bodyParser = require('body-parser')
var app = express();

var admin = require('../model/user');
var travelListing = require('../model/travelListing');
var travelListingArchive = require('../model/travelListingArchive');

// Used for JWT authentication 
var jwtUtil = require('../auth/checkToken.js');
const itinerary = require('../model/itinerary');

var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(urlencodedParser);//attach body-parser middleware
app.use(bodyParser.json());//parse json data

const cors = require('cors');
app.options('*', cors()); // include before other routes
app.use(cors());//you can place this after app.options(…);
// Endpoints

/**********************************npm*
*   ADMIN WEB API
***********************************/

// Admin login
app.post('/admin/login', function (req, res) {
    // Extract out post body information
    var email = req.body.email;
    var password = req.body.password;
    // Attempt login using user model
    admin.adminLogin(email, password, function (err, results) {
        if (err) {
            // Return 401 unauthorized as incorrect admin login
            res.status(401);
            // Forward error returned by adminLogin
            res.send(err);
        } else {
            res.status(200);
            res.type('json');
            // Send back JWT
            res.send(results);
        }
    })
})


//Admin Register
app.post('/admin/register', function (req, res) {
    // Extract out post body information
    var email = req.body.email;
    var name = req.body.name;
    var password = req.body.password;
    // Attempt login using user model
    admin.adminRegister(email, name, password, function (err, results) {
        if (err) {
            // Return 401 unauthorized as incorrect admin register
            res.status(401);
            // Forward error returned by adminRegister
            res.send(err);
        } else {
            res.status(200);
            res.type('json');
            // Send back JWT
            res.send(results);
        }
    })
})

// Admin adding of listing 
app.post('/admin/addListing', jwtUtil.verifyToken, function (req, res) {
    var title = req.body.title;                // Title
    var category = req.body.category; 	       // Category
    var description = req.body.description;    // Description
    var price = req.body.price;                // Price
    var country = req.body.country;            // Country
    var travelPeriod = req.body.travelPeriod   // travelPeriod
    var imageURL = req.body.imageURL           // ImageURL
    var currentdate = new Date();              // DateInserted based on current time
    var dateInserted = currentdate.getDate() + "/"
        + (currentdate.getMonth() + 1) + "/"
        + currentdate.getFullYear() + "_"
        + currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":"
        + currentdate.getSeconds();
    // console.log(dateInserted);
    travelListing.insertListing(title, category, description, price, country, travelPeriod,
        imageURL, dateInserted, function (err, results) {
            if (err) {
                // Return 500 Internal server error
                res.status(500);
                // Forward error returned by adminLogin
                res.send(err);
            } else {
                res.status(200);
                res.type('json');
                res.send(results);
            }
        })

})

// Admin updating of listing
app.put('/admin/updateListing', jwtUtil.verifyToken, function (req, res) {
    var title = req.body.title;                // Title
    var description = req.body.description;    // Description
    var price = req.body.price;                // Price
    var country = req.body.country;            // Country
    var category = req.body.category;	       // Category
    var travelPeriod = req.body.travelPeriod   // travelPeriod
    var ImageURL = req.body.imageURL           // ImageURL
    var currentdate = new Date();              // DateInserted based on current time
    var dateInserted = currentdate.getDate() + "/"
        + (currentdate.getMonth() + 1) + "/"
        + currentdate.getFullYear() + "_"
        + currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":"
        + currentdate.getSeconds();
    travelListing.getListingByTitle(title, function (err, existingListing) {
        if (err) {
            // Return 500 Internal server error
            res.status(500);
            // Forward error returned by getListingById
            res.send(err);
        } else {

            // Update values only if they are not null in the request body
            existingListing = existingListing[0];
            description = description || existingListing.description;
            price = price || existingListing.price;
            country = country || existingListing.country;
            category = category || existingListing.category;
            travelPeriod = travelPeriod || existingListing.travelPeriod;
            ImageURL = ImageURL || existingListing.ImageURL;

            // Archive listing first
            travelListing.archiveListing(dateInserted, req.adminID, req.adminName,
                existingListing.title, existingListing.description, existingListing.price,
                existingListing.country, existingListing.travelPeriod, existingListing.ImageURL, function (err, results) {
                    if (err) {
                        res.status(500);
                        res.send(err);
                    }
                });

            // Proceed with update
            travelListing.updateListing(title, description, price, country, category, travelPeriod,
                ImageURL, dateInserted, function (err, results) {
                    if (err) {
                        // Return 500 Internal server error
                        res.status(500);
                        // Forward error returned by adminLogin
                        res.send(err);
                    } else {
                        res.status(200);
                        res.type('json');
                        res.send(results);
                    }
                })

        }


    })


})


// Admin adding of itinerary
app.post('/admin/addItinerary', jwtUtil.verifyToken, function (req, res) {
    var travelID = req.body.travelID;
    var day = req.body.day;
    var activity = req.body.activity;
    travelListing.getListingByID(travelID, function (err, results) {
        // No such entry in databse
        if (results == null) {
            // Return 500 Internal server error
            res.status(500);
            res.send('{"Error 500":"No such travelID in database"}');
        }
        // Add itinerary to database
        else {
            itinerary.addItinerary(travelID, day, activity, function (err, results) {
                if (err) {
                    res.status(500);
                    res.send(err);
                } else {
                    res.status(200);
                    res.type('json');
                    res.send(results);
                }
            })
        }
    })
})

// Admin deleting of itinerary
app.delete('/admin/rmItinerary', jwtUtil.verifyToken, function (req, res) {
    var travelID = req.body.travelID;
    var day = req.body.day;
    itinerary.rmItinerary(travelID, day, function (err, results) {
        if (err) {
            res.status(500);
            res.send(err);
        } else {
            res.status(200);
            res.type('json');
            res.send(results);
        }
    })
})

// Admin updating of Itinerary
app.put('/admin/updateItinerary/:itineraryID', jwtUtil.verifyToken, function (req, res) {
    var itineraryID = req.params.itineraryID;
    var day = req.body.day;                // day
    var activity = req.body.activity;      // activity
    var travelID = req.body.travelID;      // travelID
    itinerary.getItineraryByItineraryID(itineraryID, function (err, existingItinerary) {
        if (err) {
            // Return 500 Internal server error
            res.status(500);
            // Forward error returned by getListingById
            res.send(err);
        } else {

            // Update values only if they are not null in the request body
            existingItinerary = existingItinerary[0];
            day = day || existingItinerary.day;
            activity = activity || existingItinerary.activity;
            travelID = travelID || existingItinerary.travelID;

            // Proceed with update
            itinerary.updateItinerary(day, activity, travelID, itineraryID, function (err, results) {
                if (err) {
                    // Return 500 Internal server error
                    res.status(500);
                    // Forward error returned by adminLogin
                    res.send(err);
                } else {
                    res.status(200);
                    res.type('json');
                    res.send(results);
                }
            })

        }
    })
})

// Admin deleting of Listing
app.delete('/admin/rmListing/:listingID', jwtUtil.verifyToken, function (req, res) {
    var listingID = req.params.listingID;
    itinerary.rmItineraryByTravelID(listingID, function (err) {
        travelListing.rmListing(listingID, function (err, results) {
            if (err) {
                res.status(500);
                res.send(err);
            } else {
                res.status(200);
                res.type('json');
                res.send(results);
            }

        })
    })

})


// Admin deleting multiple listings
app.delete('/admin/deleteListings', jwtUtil.verifyToken, function (req, res) {
    // Assuming the request body contains an array of IDs under 'ids'
    // console.log("deleteListings route hit with body: ", req.body);
    const ids = req.body.ids;
    if (!Array.isArray(ids)) {
        return res.status(400).send({ error: 'Request body must contain an array of ids.' });
    }

    // Function to delete multiple listings
    travelListing.deleteListingsByIds(ids, function (err, results) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(results);
        }
    });
});

/***********************************
*   USER WEB API
***********************************/
app.get('/public/getListings', function (req, res) {
    travelListing.getAllListings(function (err, results) {
        if (err) {
            res.status(500);
            res.send(err);
        } else {
            res.status(200);
            res.send(results);
        }
    })
})


app.get('/public/getListingBySSorCountry', function (req, res) {
    var substring = req.body.ss;
    var country = req.body.country;
    travelListing.getListingBySSorCountry(substring, country, function (err, results) {
        if (err) {
            res.status(500);
            res.send(err);
        } else {
            res.status(200);
            res.send(results);
        }
    })
})

app.get('/public/getItinerary/:travelID', function (req, res) {
    var travelID = req.params.travelID;
    itinerary.getItineraryByTravelID(travelID, function (err, results) {
        if (err) {
            res.status(500);
            res.send(err);
        } else {
            res.status(200);
            res.send(results);
        }
    })
})


// Get update history
app.get('/public/getUpdateHistory', function (req, res) {
    // Call the method to fetch update history from the travel listing archive
    travelListingArchive.getAllListingsFromArchive(function (err, results) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(results);
        }
    });
});

module.exports = app;