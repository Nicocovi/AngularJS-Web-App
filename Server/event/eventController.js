// importing Event model
var Event = require('./eventSchema');
var User = require('../user/userSchema');

var hasUserPermission = function (event, user) {
    // is user owner of the event?
    if (event.creator && event.creator === user._id) {
        return true;
    }
    // is the user ID the same as the ID of the events owner?
    else if (new String(event.creator).valueOf() === new String(user._id).valueOf()) {
        return true;
    }
    // is user added as collaborator to the event?
    else if (event.users.find(function (u) {
            return u.email === user.email
        })) {
        return true;
    }
    // if not, user has no permission!
    else {
        return false;
    }
};

var createEventReplacingEmails = function (req, res, callbackAction) {
    var newEventData = JSON.parse(JSON.stringify(req.body));
    newEventData.users = [];
    console.log("Users: ",req.body.users);
    if(req.body.users.length == 0){ //typeof req.body.users !== 'undefined' &&
        var event = new Event(req.body);
        event.save(function (err, m) {
                if (err) {
                    res.status(400).send(err);
                    return;
                }
                res.status(201).json(m);
            });
    }else{
        req.body.users.forEach(function (userEmail, idx, users) {
                User.findOne({
                    email: userEmail
                }, function (err, user) {
                    if (user) {
                        newEventData.users.push(user._id);
                        if (idx === users.length - 1) {
                            var event = new Event(newEventData);
                            callbackAction(req, res, event);
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
                                newEventData.users.push(succ._id);
                                //TODO
                                //callback problem
                                //user wird erst nach callback erstellt.
                                if (idx === users.length - 1) {
                                    var event = new Event(newEventData);
                                    callbackAction(req, res, event);
                                }
                            }
                        });
                    }
                    if (err) {
                        console.log("Error in eventController createEventReplacingEmails");
                    }

                });
            });
    }
};

exports.postEvent = function (req, res) {
    var exec = function (req, res, event) {
        //do not allow user to fake identity. The user who posted the event must be the same user that is logged in
        if (!hasUserPermission(event, req.user)) {
            res.sendStatus(401);
        } else {
            event.save(function (err, m) {
                if (err) {
                    res.status(400).send(err);
                    return;
                }
                res.status(201).json(m);
            });
        }
    };
    createEventReplacingEmails(req, res, exec);
};
// Create endpoint /api/events for GET
exports.getEvents = function (req, res) {
    Event.find({
        $or: [{
            creator: req.user._id
        }, {
            users: req.user._id
        }]
    }, function (err, events) {
        if (err) {
            res.status(400).send(err);
            return;
        }
        res.json(events);
    });
};
// Create endpoint /api/events/:event_id for GET
exports.getEvent = function (req, res) {
    // Use the Event model to find a specific movie
    Event.findById(req.params.event_id, function (err, event) {
            if (err) {
                res.status(400).send(err)
                return;
            } else
            if (!hasUserPermission(event, req.user)) {
                // only allowed to get own events
                res.sendStatus(401);
            } else {
                // Everything okay
            }
        })
        .lean().populate({
            path: 'users',
            select: 'email -_id'
        })
        .then(function (event) {
            var users = event.users;
            event.users = [];
            users.forEach(function (user) {
                event.users.push(user.email);
            });
            //return
            res.json(event);
        });
};
// Create endpoint /api/events/:event_id for PUT
exports.putEvent = function (req, res) {
    // Use the Event model to find a specific event and UPDATE it
    //console.log(req.params.event_id);
    var exec = function (req, res, event) {
        //console.log(event);
        req.body = event;
        Event.findByIdAndUpdate(
            req.params.event_id,
            req.body, {
                //pass the new object to db function
                new: true,
                //run validations
                runValidators: true
            },
            function (err, event) {
                if (err) {
                    res.status(400).send(err);
                    return;
                } else {
                    res.json(event);
                }
            });
    } //ende exec
    createEventReplacingEmails(req, res, exec);
};
// Create endpoint /api/events/:event_id for DELETE
exports.deleteEvent = function (req, res) {
    // Use the Event model to find a specific event and remove it
    Event.findById(req.params.event_id, function (err, event) {
        if (err) {
            res.status(400).send(err);
            return;
        } else
        if (!hasUserPermission(event, req.user)) {
            //only allowed to delete own events
            res.sendStatus(401);
        } else {
            event.remove();
            res.sendStatus(200);
        }
    });
};
