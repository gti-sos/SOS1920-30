
const express = require("express");
//API
const back = require("./src/back/sugarconsumeAPI");
const backv2 = require("./src/back/sugarconsumeAPI/v2");
const backv1 = require("./src/back/sugarconsumeAPI/v1");
//API RAUL
const back2V1 = require("./src/back/imcAPI/V1"); 
const back2V2 = require("./src/back/imcAPI/V2"); 
const back2 = require("./src/back/imcAPI"); 
const bodyParser = require("body-parser");

const cors = require("cors");
var app = express();
app.use(bodyParser.json());


app.use(cors());
/*
var proxyBelen = "/api/v2/crime-rate-stats";
var urlProxyBelen = " http://sos1920-11.herokuapp.com";


app.use(proxyBelen, function(req, res){
    console.log("piped: " + urlProxyBelen);
    req.pipe(request(urlProxyBelen).pipe(res))
})*/
/*var paths = '/api';
var apiServerHost = 'https://platform.fatsecret.com/';

app.use(paths, function(req,res){
   var url = apiServerHost + req.baseUrl + req.url;
   req.pipe(request(url)).pipe(res);
});
app.use(express.static('.'));
*/
var port = process.env.PORT || 12345;

app.use("/",express.static("./public"));
backv2(app);
backv1(app);
back(app);
back2(app);
back2V1(app);
back2V2(app);

app.listen(port, () => {
	console.log("Server ready");
});

console.log("Starting server...");