const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const imcapi = require(path.join(__dirname,"imcapi"));
const sugarconsumeAPI = require(path.join(__dirname,"sugarconsumeAPI"));

const port = process.env.PORT || 80;




const app = express();

app.use(bodyParser.json());


app.use("/",express.static("./public"));

sugarconsumeAPI(app);	

imcapi(app);

app.listen(port,() => {
	console.log("Server ready");
					});

console.log("Starting server...");
