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
