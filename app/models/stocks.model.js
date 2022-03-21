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

// get list of all stocks
StocksModel.fetchInfo = (stock,result) => {
      axios.get(`https://financialmodelingprep.com/api/v3/profile/${stock}?apikey=72636bc36954e77da53da15fb01c2a9e`)
        .then((resp)=>{
            console.log("RESPONSE : ",resp);
            result(null,resp)
        }).catch((err)=>{
        result(err,null)
    })
}

// search stock
StocksModel.searchStock = (filter,value,result) => {
    console.log("Search param in dB  :",filter);
    console.log("Search query in dB  :",value);
    // let searchValue = `${stock}%` // Percentage
    let searchValue = `${value}`
    let queryString;
    let finalString;
    if(filter == 'CompanyStockSymbol' || filter == 'CompanyName'){
        queryString = 'SELECT * from stocks_data where '+ filter 
        finalString = queryString+ " like '" + value+"%'"
    }else if(filter == 'SharePriceGreater'){
        queryString = 'SELECT * from stocks_data where SharePrice'
        finalString = queryString+ ' > '+value
    }else if(filter == 'SharePriceLesser'){
        queryString = 'SELECT * from stocks_data where SharePrice'
        finalString = queryString+ ' < '+value
    }

    console.log("QUERY : ",queryString);
    sql.query(finalString,filter,(err,res)=> { 
        if(err){
            console.log("error : ",err);
            result(err,null);
            return;
        }
        result(null,res);
        console.log("Query Resp",res);
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