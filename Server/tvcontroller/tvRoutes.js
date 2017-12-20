module.exports = tvRoutes;

function tvRoutes() {

    var tvController = require('./tvController');
    var router = require('express').Router();

    router.post('/turnon', tvController.turnon);
    router.post('/turnoff', tvController.turnoff);

    return router;
}
