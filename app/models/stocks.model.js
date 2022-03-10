const sql = require("./db.js");

//Constructor
const StocksModel = function(){
};

// get list of all stocks
StocksModel.fetchAll = (result) => {
    sql.query('SELECT * FROM `stocks_data`',(err,res)=>{
        if(err){
            console.log("error : ",err);
            result(err,null);
            return;
        }
        // console.log("Stocks Data",res);
        result(null,res);
    })
}

module.exports = StocksModel;