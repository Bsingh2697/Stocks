
// External Service Routes

module.exports = app => {
    const express = require('express');
    const router = express.Router();

    const exservController = require('../controller/externalservices_controller.js');

    // Fetch exchange rates
    router.get('/exchange_rate',exservController.fetchExchangeRate);
    // Fetch twitter tweets
    router.get('/tweets/:query',exservController.fetchTweets);

    app.use('/exserv',router);  
}