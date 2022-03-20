
const StockModel = require('../models/stocks.model.js');

exports.fetchAll = (req,res) => {
    StockModel.fetchAll((err,data)=> {
        if(err)
        // res.type('text/xml').send() => For xml format
        res.status(200).send({
            message : err.message || "Some error occurred while fetching stocks"
        });
        else
            res.status(200).send(data);
    })
}

exports.searchStock = (req,res)=>{
    console.log("Search query",req.params.stock);
    StockModel.searchStock(req.params.stock,(err,data)=>{
        if(err)
            res.status(200).send({
                message : err.message || "Some error occurred while searching stocks"
        });
        else
            res.status(200).send(data);
    })
}

exports.setLatestPrice = (req,res)=>{
    console.log("Set latest price",req.params.stock);
    StockModel.setLatestPrice(req.params.stock,(err,data)=>{
        if(err)
            res.status(200).send({
                message : err.message || "Some error occurred while searching stocks"
        });
        else
            res.status(200).send(data);
    })
}