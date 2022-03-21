const { JSON } = require("mysql/lib/protocol/constants/types");
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
    // price : Price
    // signal : Buy/sell Signal (0 for buy and 1 for sell)

    console.log("ID : ",id);
    console.log("Data : ",data);

    if(data.signal == "0"){
    sql.query('Update userstocks set QUANTITY = QUANTITY + ? where USER = ? AND STOCK = ?;',
                [data.qnt,id,data.sid],(err,res)=> {
                    if(err){
                        console.log("error : ",err);
                        result(err,null);
                        return;
                    }
                    console.log("Updated Stock Quantity ",res);
                    // result(null,res);
                    // return
                })
    let curbal;
    sql.query('Select Balance from userdata where UID = ?',id,(err,res)=>{
        // curbal = res;
        console.log("USER FUNDS : ",Object.values(res[0]));
         curbal = Object.values(res[0])[0];
        console.log(curbal);
         let amt = data.qnt*data.price;
        sql.query('update userdata set Balance = ?-? where UID = ?',
        [curbal,amt,id],(err,res)=> {
            if(err){
                console.log("error : ",err);
                result(err,null);
                return;
            }
            // console.log("Updated Stock Quantity ",res);
            result(null,res);
            return
        })
    })
        
            }
    else{
    sql.query('Update userstocks set QUANTITY = QUANTITY - ? WHERE USER = ? AND STOCK = ?;',
                [data.qnt,id,data.sid],(err,res)=> {
                    if(err){
                        console.log("error : ",err);
                        result(err,null);
                        return;
                    }
                    // console.log("Updated Stock Quantity ",res);
                    // result(null,res);
                    // return
                })
    let curbal;
     sql.query('Select Balance from userdata where UID = ?',id,(err,res)=>{
                console.log("USER FUNDS : ",Object.values(res[0]));
        curbal = Object.values(res[0])[0];
        console.log(curbal);
         let amt = data.qnt*data.price;
        sql.query('update userdata set Balance = ?+? where UID = ?',
        [curbal,amt,id],(err,res)=> {
            if(err){
                console.log("error : ",err);
                result(err,null);
                return;
            }
            // console.log("Updated Stock Quantity ",res);
            result(null,res);
            return
        })   
    })          
        
        }


}


// GET ALL STOCKS FOR PARTICULAR USER
UserModel.fetchUserDetails = (uid, result) => {
    console.log("UID : ",uid);
    sql.query(`SELECT * FROM userdata where UID=?`,uid,(err,res)=> {
        if(err){
            console.log('error: ',err);
            result(err, null);
            return;
        }
        result(null,res)
    })
}


// Login User
UserModel.loginUser = (uname, password, result) => {
    
    sql.query(`Update userdata set Status = 1 where UNAME=? AND Password=?;`,[uname,password],(err,res)=> {
        if(err){
            console.log('error: ',err);
            result(err, null);
            return;
        }
        sql.query(`Select * from userdata where UNAME=? AND Password=?;`,[uname,password],(err,res)=> {
            if(err){
                console.log('error: ',err);
                result(err, null);
                return;
            }
            console.log("UNAME : ",uname);
            result(null,res)
        })
    })
}

// Logout User
UserModel.logoutUser = (uid, result) => {
    console.log("UID : ",uid);
    sql.query(`Update userdata set Status = 0 where UID = ?;`,uid,(err,res)=> {
        if(err){
            console.log('error: ',err);
            result(err, null);
            return;
        }
        result(null,res)
    })
}


module.exports = UserModel;
