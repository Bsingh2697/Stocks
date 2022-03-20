require('dotenv').config()

const express = require("express");
const app = express();

// const cors = require("cors");
// var corsOptions = {
//     origin: "http://localhost:8081"
// };
// app.use(cors(corsOptions));

app.use(express.json()); // Parses to JSON

app.use(express.urlencoded({extended:true})); // Parses/converts non-ASCII characters into a format which can be transmitted

const PORT = process.env.PORT || 3000;

require("./app/routes/stocks.routes.js")(app);

require("./app/routes/userstocks.routes.js")(app);

require("./app/routes/externalservice.routes.js")(app);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});