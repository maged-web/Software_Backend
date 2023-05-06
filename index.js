//===================== INITIALIZE EXPRESS APP
const express = require("express");
const app = express();
const books = require("./routes/Books")
const auth = require("./routes/Auth");
const reader = require("./routes/Reader");
const request = require("./routes/Request");


//=====================GLOBAL MIDDLE WARE
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // TO ACCESS URL FORM ENCODED
app.use(express.static('upload'));
const cors = require("cors");
app.use(cors());

app.use("/books", books)
app.use("/auth", auth)
app.use("/reader", reader)
app.use("/request", request)

//ALLOW HTTP REQUESTS LOCAL HOSTS
//======================REQUIRED MODULE
//======================RUN THE APP


app.listen("3090", "localhost", () => {
    console.log("SERVER IS RUNNING");
})
//======================API ROUTES [END POINTS]


//module.exports = router