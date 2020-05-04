
const express = require("express");
const back = require("./src/back");
const bodyParser = require("body-parser");
var app = express();
app.use(bodyParser.json());


var port = process.env.PORT || 12345;

app.use("/",express.static("./public"));
back(app);

app.listen(port, () => {
	console.log("Server ready");
});

console.log("Starting server...");