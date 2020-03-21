const cool = require("cool-ascii-faces");
const express = require("express");

var app = express();

app.get("/cool",(request,response) => {
	response.send("<html>"+cool()+"</html>");
});

app.listen(80);

console.log("server ready");