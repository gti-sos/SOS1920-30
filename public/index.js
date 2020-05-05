
const express = require("express");
const back = require("./src/back/sugarconsumeAPI");
const back2 = require("./src/back/imcAPI");
const bodyParser = require("body-parser");
var app = express();
app.use(bodyParser.json());


var port = process.env.PORT || 12345;

app.use("/",express.static("./public"));
back(app);
back2(app);

app.listen(port, () => {
	console.log("Server ready");
});

console.log("Starting server...");