// importing Trip model
var Trip = require('./tripSchema');
var User = require('../user/userSchema');

var hasUserPermission = function (trip, user) {
    // is user owner of the trip?
    if (trip.creator && trip.creator === user._id) {
        return true;
    }
    // is the user ID the same as the ID of the trips owner?
    else if (new String(trip.creator).valueOf() === new String(user._id).valueOf()) {
        return true;
    }
    // is user added as collaborator to the trip?
    else if (trip.users.find(function (u) {
            return u.email === user.email
        })) {
        return true;
    }
    // if not, user has no permission!
    else {
        return false;
    }
};

var createTripReplacingEmails = function (req, res, callbackAction) {
    var newTripData = JSON.parse(JSON.stringify(req.body));
    newTripData.users = [];
    console.log(req.body.users);
    req.body.users.forEach(function (userEmail, idx, users) {
        User.findOne({
            email: userEmail
        }, function (err, user) {
            if (user) {
                newTripData.users.push(user._id);
                if (idx === users.length - 1) {
                    var trip = new Trip(newTripData);
                    callbackAction(req, res, trip);
                }

            } else {
                var user = new User();
                user.email = userEmail;
                user.password = "";

                user.save(function (err, succ) {
                    if (err) {
                        res.status(500).send(err);
                        return;
                    }
                    if (succ) {
                        //console.log(succ._id);
                        newTripData.users.push(succ._id);
                        //TODO
                        //callback problem
                        //user wird erst nach callback erstellt.
                        if (idx === users.length - 1) {
                            var trip = new Trip(newTripData);
                            callbackAction(req, res, trip);
                        }
                    }
                });
            }
            if (err) {
                console.log("Error in tripController createTripReplacingEmails");
            }

        });
    });
};

exports.postTrip = function (req, res) {
    var exec = function (req, res, trip) {
        //do not allow user to fake identity. The user who posted the trip must be the same user that is logged in
        if (!hasUserPermission(trip, req.user)) {
            res.sendStatus(401);
        } else {
            trip.save(function (err, m) {
                if (err) {
                    res.status(400).send(err);
                    return;
                }
                res.status(201).json(m);
            });
        }
    };
    createTripReplacingEmails(req, res, exec);
};
// Create endpoint /api/trips for GET
exports.getTrips = function (req, res) {
    Trip.find({
        $or: [{
            creator: req.user._id
        }, {
            users: req.user._id
        }]
    }, function (err, trips) {
        if (err) {
            res.status(400).send(err);
            return;
        }
        res.json(trips);
    });
};
// Create endpoint /api/trips/:trip_id for GET
exports.getTrip = function (req, res) {
    // Use the Trip model to find a specific movie
    Trip.findById(req.params.trip_id, function (err, trip) {
            if (err) {
                res.status(400).send(err)
                return;
            } else
            if (!hasUserPermission(trip, req.user)) {
                // only allowed to get own trips
                res.sendStatus(401);
            } else {
                // Everything okay
            }
        })
        .lean().populate({
            path: 'users',
            select: 'email -_id'
        })
        .then(function (trip) {
            var users = trip.users;
            trip.users = [];
            users.forEach(function (user) {
                trip.users.push(user.email);
            });
            //return
            res.json(trip);
        });
};
// Create endpoint /api/trips/:trip_id for PUT
exports.putTrip = function (req, res) {
    // Use the Trip model to find a specific trip and UPDATE it
    //console.log(req.params.trip_id);
    var exec = function (req, res, trip) {
        //console.log(trip);
        req.body = trip;
        Trip.findByIdAndUpdate(
            req.params.trip_id,
            req.body, {
                //pass the new object to db function
                new: true,
                //run validations
                runValidators: true
            },
            function (err, trip) {
                if (err) {
                    res.status(400).send(err);
                    return;
                } else {
                    res.json(trip);
                }
            });
    } //ende exec
    createTripReplacingEmails(req, res, exec);
};
// Create endpoint /api/trips/:trip_id for DELETE
exports.deleteTrip = function (req, res) {
    // Use the Trip model to find a specific trip and remove it
    Trip.findById(req.params.trip_id, function (err, trip) {
        if (err) {
            res.status(400).send(err);
            return;
        } else
        if (!hasUserPermission(trip, req.user)) {
            //only allowed to delete own trips
            res.sendStatus(401);
        } else {
            trip.remove();
            res.sendStatus(200);
        }
    });
};
