
module.exports = app => {
 const express = require('express');
 const router = express.Router();

 const userController = require('../controller/user_stocks_controller.js');

 // Fetch user stocks

 router.get('/all',userController.fetchUserStocks)

 app.use('/user',router);

}