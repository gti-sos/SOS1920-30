const cool = require("cool-ascii-faces");
const express = require("express");
const bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.json());

var port = process.env.PORT || 80;

app.use("/",express.static("./public"));

app.get("/cool",(request,response) => {
	response.send("<html>"+cool()+"</html>");
});

var indice_de_masa_corporal = [
	{
		place: "Alemania",
		indice_de_masa_corporal: 25.32
		
	},
	{
		place: "Polonia",
		indice_de_masa_corporal: 23.21
		
	},
	{
		place: "Hungría",
		indice_de_masa_corporal: 24.45
		
	}
];
const predeterminado = [
	{
		place: "Alemania",
		indice_de_masa_corporal: 25.32
		
	},
	{
		place: "Polonia",
		indice_de_masa_corporal: 23.21
		
	},
	{
		place: "Hungría",
		indice_de_masa_corporal: 24.45
		
	}
];
const BASE_API_URL = "/api/v1";

//GET CONTACTS

app.get(BASE_API_URL+"/indice_de_masa_corporal",(req,res) => {
	res.send(JSON.stringify(indice_de_masa_corporal, null, 2));
	console.log("Data sent:"+JSON.stringify(indice_de_masa_corporal,null,2));
});

//Loadinitialdata

app.get(BASE_API_URL+"/indice_de_masa_corporal/loadInitialData",(req,res) => {
	indice_de_masa_corporal = predeterminado;
	res.sendStatus(201, "CREATED");
});

//POST CONTACTS
app.post(BASE_API_URL+"/indice_de_masa_corporal",(req,res) => {
	var newindice_de_masa_corporal = req.body;
	if((newindice_de_masa_corporal == "") || (newindice_de_masa_corporal.place == null)){
			res.sendStatus(400, "BAD REQUEST(no name provided)");
	}
	else{
		indice_de_masa_corporal.push(newindice_de_masa_corporal);
		res.sendStatus(201, "CREATED");
	}
});





//GET CONTACT/XXX
app.get(BASE_API_URL+"/indice_de_masa_corporal/:place",(req,res) => {
	var place = req.params.place;
	var filteredindice_de_masa_corporal = indice_de_masa_corporal.filter((c) =>{
		return (c.place == place);
	});
	if(filteredindice_de_masa_corporal.length >= 1){
		res.send(filteredindice_de_masa_corporal[0]);
	}else{
		res.sendStatus(404, "CONTACT NOT FOUND");
	}
		
	
	
//DELETE CONTACTS
	app.delete(BASE_API_URL+"/indice_de_masa_corporal",(req,res) => {
		if(indice_de_masa_corporal.length == 0){
			res.sendStatus(404, "masa corporal NOT FOUND");
		}else{
			indice_de_masa_corporal = "";
			res.sendStatus(200,"OK")
		}
	});
	
	
});
//PUT CONTACT/XXX
app.put(BASE_API_URL+"/indice_de_masa_corporal/:place",(req,res) => {
	var place = req.params.place;
	if(!place){
		res.sendStatus(404);
	}
	else{
		if(place == ""){
			res.sendStatus(400, "PLACE DOES NOT EXIST")
		}else{
			place == req.body.place;
			res.sendStatus(200, "PLACE PUT OK")
		}
	}
	
	
});
//DELETE CONTACT/XXX

app.delete(BASE_API_URL+"/indice_de_masa_corporal/:place",(req,res) => {
	var place = req.params.place;
	var filteredindice_de_masa_corporal = indice_de_masa_corporal.filter((c) =>{
		return (c.place != place);
	});
	if(filteredindice_de_masa_corporal.length < indice_de_masa_corporal.length){
		indice_de_masa_corporal = filteredindice_de_masa_corporal;
		res.sendStatus(200, "OK");
		
	}else{
		res.sendStatus(404, "masa corporal PLACE NOT FOUND");
	}
});

//POST CONTACT/XXX

app.post(BASE_API_URL+"/indice_de_masa_corporal/:place",(req,res) => {
	
		res.sendStatus(405, "METHOD NOT ALLOWED");
	});

//PUT CONTACT
app.put(BASE_API_URL+"/indice_de_masa_corporal",(req,res) => {
	res.sendStatus(405, "METHOD NOT ALLOWED");
});

app.listen(port,() => {
	console.log("Server ready");
					});

console.log("Starting server...");
