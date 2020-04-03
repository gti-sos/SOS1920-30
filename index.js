
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const imcapi = require(path.join(__dirname,"imcapi"));

const port = process.env.PORT || 80;




const app = express();

app.use(bodyParser.json());


app.use("/",express.static("./public"));



imcapi(app);

app.listen(port,() => {
	console.log("Server ready");
					});

console.log("Starting server...");
