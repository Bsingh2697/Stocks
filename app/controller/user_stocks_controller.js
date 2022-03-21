
const UserModel = require('../models/userstocks.model.js');

exports.fetchUserStocks = (req,res) => {
    UserModel.fetchUserStocks((err,data)=>{
        if(err)
        res.status(200).send({
            message : err.message || "Some error occurred while fetching user stocks"
        });
        else
            res.status(200).send(data)
    })
}

exports.fetchMyStocks = (req,res) => {
    UserModel.fetchMyStocks(req.params.uid,(err,data)=>{
        if(err)
        res.status(200).send({
            message : err.message || "Some error occurred while fetching user stocks"
        });
        else
            res.status(200).send(data)
    })
}

exports.buySellStock = (req,res)=>{
    if(!req.body){
        res.status(400).send({
        message : "Content can not be empty!"
        });
    }

    console.log("REQ : ",req.body);
    console.log("ID AAJA : ",req.params.uid);

    !req.body.sid ?
    res.status(200).send({message: "Stock Id (sid) is required"}) :
    !req.body.qnt ? 
    res.status(200).send({message: "Quantity (qnt) is required"}) : 
    !req.body.signal ?
    res.status(200).send({message: "Buy/Sell Signal (signal) is required"}) :
    !req.body.price ?
    res.status(200).send({message: "Price is required"})
    : {}

    const usermodel = {
        uid : req.params.uid,
        sid : req.body.sid,
        qnt : req.body.qnt,
        signal : req.body.signal,
        price : req.body.price
    };
    UserModel.buySellStocks(req.params.uid,usermodel,(err,data)=>{
        if(err)
        res.status(200).send({
            message : err.message || "Some error occurred while fetching user stocks"
        });
        else
            res.status(200).send(data)
    })
}

exports.fetchUserDetails = (req,res) => {
    UserModel.fetchUserDetails(req.params.uid,(err,data)=>{
        if(err)
        res.status(200).send({
            message : err.message || "Some error occurred while fetching user stocks"
        });
        else
            res.status(200).send(data)
    })
}

