module.exports = tripRoutes;


function tripRoutes(passport) {

    var tripController = require('./tripController');
    var router = require('express').Router();
    var unless = require('express-unless');

    var mw = passport.authenticate('jwt', {
        session: false
    });
    mw.unless = unless;

    //middleware
    router.use(mw.unless({
        // method: [ 'GET', 'OPTIONS']
    }));

    router.route('/')
        .post(tripController.postTrip)
        .get(tripController.getTrips);

    router.route('/:trip_id')
        .get(tripController.getTrip)
        .put(tripController.putTrip)
        .delete(tripController.deleteTrip);

    //custom middleware to pass trip id
    router.use('/:trip_id', function (req, res, next) {
        res.locals.trip_id = req.params.trip_id;
        next();
    });

    var activityRoutes = require("../activity/activityRoutes");
    router.use('/:trip_id/activities', activityRoutes(passport));

    return router;
}
