
module.exports = app => {
 const express = require('express');
 const router = express.Router();

 const userController = require('../controller/user_stocks_controller.js');

 // Fetch user stocks
 router.get('/all',userController.fetchUserStocks)
 router.get('/all/:uid',userController.fetchMyStocks)
 // uid : Used Id
 // sid : Stock Id
 // qnt : Quantity
 // signal : Buy/sell Signal (0 for buy and 1 for sell)
 router.put('/stock/update/:uid',userController.buySellStock)

 app.use('/user',router);

}