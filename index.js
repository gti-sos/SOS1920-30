const cool = require("cool-ascii-faces");
const express = require("express");

var app = express();

var port = process.env.PORT || 12345;

app.use("/",express.static("./public"));

app.get("/cool",(request,response) => {
	response.send("<html>"+cool()+"</html>");
});

app.listen(port, () => {
	console.log("Server ready");
});

console.log("Starting server...");