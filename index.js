
const express = require("express");
const back = require("./src/back/sugarconsumeAPI");
const backv1 = require("./src/back/sugarconsumeAPI/v1");

const back2 = require("./src/back/imcAPI");
const bodyParser = require("body-parser");
const cors = require("cors");
var app = express();
app.use(bodyParser.json());


app.use(cors())



var port = process.env.PORT || 12345;

app.use("/",express.static("./public"));
back(app);
back2(app);
backv1(app);

app.listen(port, () => {
	console.log("Server ready");
});

console.log("Starting server...");