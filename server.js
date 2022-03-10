require('dotenv').config()

const express = require("express");
const app = express();

// const cors = require("cors");
// var corsOptions = {
//     origin: "http://localhost:8081"
// };
// app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({extended:true}));

const PORT = process.env.PORT || 3000;

require("./app/routes/stocks.routes.js")(app)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});