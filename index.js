
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
const request = require("request");

const cors = require("cors");
var app = express();
app.use(bodyParser.json());


app.use(cors());

var pathImc='/api/search';
var apiServerHostImc = 'https://food-calorie-data-search.p.rapidapi.com';

app.use(pathImc, function(req, res) {
	var url = apiServerHostImc + req.baseUrl + req.url;
	console.log('piped: '+req.baseUrl + req.url);
	req.pipe(request(url)).pipe(res);
});

/*
var proxyBelen = "/api/v1/ppas";
var urlProxyBelen = "https://sos1920-28.herokuapp.com";


app.use(proxyBelen, function(req, res){
    console.log("piped: " + urlProxyBelen);
    req.pipe(request(urlProxyBelen).pipe(res))
})
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