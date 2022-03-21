
module.exports = app => {
const express = require('express')
const router = express.Router();
const stockController = require('../controller/stock_controller.js');

// Fetch all stocks
router.get('/all',stockController.fetchAll)
router.get('/info/:stock',stockController.fetchInfo)
router.get('/search/:filter/:value',stockController.searchStock)
router.put('/update/:stock',stockController.setLatestPrice)

app.use('/stocks',router);
}