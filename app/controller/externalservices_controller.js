
const ExServModel = require('../models/externalservice.model.js');

// External Services Controller

exports.fetchExchangeRate = (req,res) => {
    ExServModel.fetchExchangeRates((err,data)=>{
        if(err)
        res.status(200).send({
            message : err.message || "Some error occurred while fetching exchange rates"
        });
        else
            res.status(200).send(data)
    })
}

exports.fetchTweets = (req,res) => {
    ExServModel.fetchTweets(req.params.query,(err,data)=> {
        if(err)
            res.status(200).send({
                message : err.message || "Some error occurred while fetching tweets"
            });
        else
            res.status(200).send(data)
    })
}