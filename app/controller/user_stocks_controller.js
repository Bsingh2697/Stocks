
const UserModel = require('../models/userstocks.model.js');

exports.fetchUserStocks = (req,res) => {
    UserModel.fetchUserStocks((err,data)=>{
        if(err)
        res.status(200).send({
            message : err.message || "Some error occurred which fetching user stocks"
        });
        else
            res.status(200).send(data)
    })
}