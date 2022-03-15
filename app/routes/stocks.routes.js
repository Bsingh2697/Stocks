
module.exports = app => {
const express = require('express')
const router = express.Router();
const stockController = require('../controller/stock_controller.js');

// Fetch all stocks
router.get('/all',stockController.fetchAll)
router.get('/search/:stock',stockController.searchStock)

app.use('/stocks',router);
}