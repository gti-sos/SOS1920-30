
const express = require("express");
//API
const back = require("./src/back/sugarconsumeAPI");
const backv2 = require("./src/back/sugarconsumeAPI/v2");
const backv1 = require("./src/back/sugarconsumeAPI/v1");
//API RAUL
const back2 = require("./src/back/imcAPI"); //v3,v2,v1
const bodyParser = require("body-parser");

const cors = require("cors");
var app = express();
app.use(bodyParser.json());


app.use(cors());

var paths = '/api';
var apiServerHost = 'https://platform.fatsecret.com/';

app.use(paths, function(req,res){
   var url = apiServerHost + req.baseUrl + req.url;
   req.pipe(request(url)).pipe(res);
});
app.use(express.static('.'));

var port = process.env.PORT || 12345;

app.use("/",express.static("./public"));
backv2(app);
back2(app);
backv1(app);
back(app);

app.listen(port, () => {
	console.log("Server ready");
});

console.log("Starting server...");