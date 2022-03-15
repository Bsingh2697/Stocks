const sql = require("./db.js");
const axios = require('axios').default;

// External Service Model

// Constructor for External Service
const ExServModel = () => {};

// Get exchange rates
ExServModel.fetchExchangeRates = (result) => {
    axios.get('http://api.exchangeratesapi.io/v1/latest?access_key=4933f474954e6372c0361cdfa3c6de29')
        .then((resp)=>{
            console.log("RESPONSE : ",resp);
            console.log("RESPONSE : ",resp.data);
            result(null,resp.data.rates)
        }).catch((err)=>{
        result(err,null)
    })
}

// Fetch Tweets
ExServModel.fetchTweets = (value,result) => {
    console.log("QUERY : ",value);
    // let turl = 
    // console.log("TURL :",turl);
    axios({
           url : `https://api.twitter.com/2/tweets/search/recent?query=${value}`,
           method:'GET',
           headers : {
            //    Authorization: 'OAuth oauth_consumer_key="AvUReIpvADswCoyCQ0EHAkBwQ",oauth_token="818091183784296448-8Bp4Iq3FL4w9iJbqYwQ5iW7QrsjQZQl",oauth_signature_method="HMAC-SHA1",oauth_timestamp="1647295575",oauth_nonce="PmPT1wgwfUX",oauth_version="1.0",oauth_signature="AiFzu22NKTvgtHDWrkq%2FKOAtbSU%3D"'
           Authorization : 'Bearer AAAAAAAAAAAAAAAAAAAAAFDOaAEAAAAAdzKc1tLzrOhGRgsvwAyHpShDT38%3DjOw6RZLMvruUA1eB3PwoOuugPcfebZiSqZyIDQpKwnnm6wYozT'
        }
    }).then((resp)=>{
            console.log("RESPONSE : ",resp);
            // console.log("RESPONSE : ",resp.data);
            result(null,resp.data)
    }).catch((err)=>{
        console.log("ERROR BHAI",err);
        result(err,null)
    })
}

module.exports = ExServModel;
