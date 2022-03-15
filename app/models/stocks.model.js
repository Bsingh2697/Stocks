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

// search stock
StocksModel.searchStock = (stock,result) => {
    console.log("Search query in dB  :",stock);
    let searchValue = `${stock}%`
    sql.query('SELECT * from stocks_data where CompanyStockSymbol LIKE ?',searchValue,(err,res)=> {
        if(err){
            console.log("error : ",err);
            result(err,null);
            return;
        }
        result(null,res);
    })
}

module.exports = StocksModel;