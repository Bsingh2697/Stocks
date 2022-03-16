const sql = require("./db.js");

//Constructor
const UserModel = ()=>{};

// Get All User Stocks
UserModel.fetchUserStocks = (result) => {
    sql.query('Select * From `userstocks`',(err,res)=>{
        if(err){
            console.log("error : ",err);
            result(err,null);
            return;
        }
        result(null,res);
    })
}

// GET ALL STOCKS FOR PARTICULAR USER
UserModel.fetchMyStocks = (uid, result) => {
    console.log("UID : ",uid);
    sql.query(`SELECT *
FROM userstocks
INNER JOIN stocks_data
ON userstocks.STOCK = stocks_data.CID
INNER JOIN userdata
ON userstocks.USER = userdata.UID where userstocks.USER = ?`,uid,(err,res)=> {
        if(err){
            console.log('error: ',err);
            result(err, null);
            return;
        }
        result(null,res)
    })
}

// BUY/SELL Stocks 
UserModel.buySellStocks = (id,data,result) => {

    // sid : Stock Id
    // qnt : Quantity
    // signal : Buy/sell Signal (0 for buy and 1 for sell)

    console.log("ID : ",id);
    console.log("Data : ",data);

    if(data.signal == "0")
    sql.query('Update userstocks set QUANTITY = QUANTITY + ? where USER = ? AND STOCK = ?;',
                [data.qnt,id,data.sid],(err,res)=> {
                    if(err){
                        console.log("error : ",err);
                        result(err,null);
                        return;
                    }
                    console.log("Updated Stock Quantity ",res);
                    result(null,res);
                    return
                })
    else
    sql.query('Update userstocks set QUANTITY = QUANTITY - ? WHERE USER = ? AND STOCK = ?;',
                [data.qnt,id,data.sid],(err,res)=> {
                    if(err){
                        console.log("error : ",err);
                        result(err,null);
                        return;
                    }
                    console.log("Updated Stock Quantity ",res);
                    result(null,res);
                    return
                })


}

module.exports = UserModel;
