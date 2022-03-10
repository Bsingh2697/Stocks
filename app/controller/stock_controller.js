
const StockModel = require('../models/stocks.model.js');

exports.fetchAll = (req,res) => {
    StockModel.fetchAll((err,data)=> {
        if(err)
        res.status(200).send({
            message : err.message || "Some error occurred while fetching stocks"
        });
        else
            res.status(200).send(data);
    })
}