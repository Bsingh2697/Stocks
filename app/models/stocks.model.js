const sql = require("./db.js");
const axios = require('axios').default;

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

// SET LATEST PRICE
StocksModel.setLatestPrice = (stock,result) => {
    console.log("SET LATEST PRICE  :",stock);
    axios({
            method: 'GET',
            url: 'https://stock-market-data.p.rapidapi.com/stock/quote',
            params: {ticker_symbol: stock},
            headers: {
                'x-rapidapi-host': 'stock-market-data.p.rapidapi.com',
                'x-rapidapi-key': '5252b61832msh0810f8b4facf30ap1ea38fjsn92b51ece64b1'
            }
    }).then((resp)=>{
            console.log("RESPONSE : ",resp);
            console.log("RESPONSE : ",resp.data.quote["Current Price"]);
            sql.query('UPDATE stocks_data set SharePrice = ?, PriceUpdateDate = ? where CompanyStockSymbol = ?',[resp.data.quote["Current Price"],resp.data.date,stock],(err,res)=> {
                if(err){
                    console.log("error : ",err);
                    result(err,null);
                    return;
                }
                console.log("Successfully Updated");
                result(null,res);
            })
    }).catch((err)=>{
        console.log("ERROR",err);
        result(err,null)
    })
    // let searchValue = `${stock}%`
    // sql.query('SELECT * from stocks_data where CompanyStockSymbol LIKE ?',searchValue,(err,res)=> {
    //     if(err){
    //         console.log("error : ",err);
    //         result(err,null);
    //         return;
    //     }
    //     result(null,res);
    // })
}

module.exports = StocksModel;