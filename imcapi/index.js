module.exports = function (app) {
	console.log("Regidtering imcapi...");
	const dataStore = require("nedb");
	const path = require("path");
	const parametros = 2;
	//app.get("/cool",(request,response) => {
//	response.send("<html>"+cool()+"</html>");
//});
	const dbFileName = path.join(__dirname,"/indice_de_masa_corporal.db");
	const BASE_API_URL = "/api/v1";
	 
	const db = new dataStore({
					filename: dbFileName,
					autoload: true
});
var initialimc = [
	{
		place: "Alemania",
		indice_de_masa_corporal: 25.32,
		year: 2019
		
	},
	{
		place: "Polonia",
		indice_de_masa_corporal: 23.21,
		year: 2019
		
	},
	{
		place: "Hungría",
		indice_de_masa_corporal: 24.45,
		year: 2019
		
	},
	{
		place: "Alemania",
		indice_de_masa_corporal: 27.03,
		year: 2020
		
	},
	{
		place: "Polonia",
		indice_de_masa_corporal: 25.00,
		year: 2020
		
	},
	{
		place: "Hungría",
		indice_de_masa_corporal: 2,
		year: 2020
		
	}
	
];


//Loadinitialdata
app.get(BASE_API_URL+"/indice_de_masa_corporal/loadInitialData",(req,res) => {
	
		console.log("New Get .../indice_de_masa_corporal/loadInitialData")
	
	db.insert(initialimc);
	res.sendStatus(200, "CREATED");
	console.log("Initialdata sent:"+JSON.stringify(initialimc,null,2));
});


//GET CONTACTS
app.get(BASE_API_URL+"/indice_de_masa_corporal",(req,res) => {
	
	console.log("New Get .../indice_de_masa_corporal")
	
	db.find({},(err,indice_de_masa_corporal) => {
		indice_de_masa_corporal.forEach( (c) => {
			delete c._id;
		});
		res.send(JSON.stringify(indice_de_masa_corporal, null, 2));
		console.log("Data sent:"+JSON.stringify(indice_de_masa_corporal,null,2));
	}); 
});

	
//POST CONTACTS
app.post(BASE_API_URL+"/indice_de_masa_corporal",(req,res) => {
	var newindice_de_masa_corporal = req.body;
	if((newindice_de_masa_corporal == "") || (newindice_de_masa_corporal.place == null)){
			res.sendStatus(400, "BAD REQUEST(no name provided)");
	}
	else{
		db.insert(newindice_de_masa_corporal);
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
			db.remove({}, {multi:true}, (error, indice_de_masa_corporal) => {
			console.log(indice_de_masa_corporal + "imc deleted");
		});
			res.sendStatus(200,"OK")
		}
	})
	
	
});
//PUT CONTACT/XXX
app.put(BASE_API_URL+"/indice_de_masa_corporal/:place",(req,res) => {
	var place = req.params.place;
	var filteredindice_de_masa_corporal = indice_de_masa_corporal.filter((c) =>{
		return (c.place != place);
	});
	if(filteredindice_de_masa_corporal.length==0){
		res.sendStatus(404,"place not found");
	}
	else{
		if(place == ""){
			res.sendStatus(400, "PLACE DOES NOT EXIST")
		}else{
			var body= req.body;
			var len = 0
			for (x in body) {
				len+=1;
  			} 
			if (len!=parametros){
				res.sendStatus(400,"BAD REQUEST");
			}else{
		
				var newindice_de_masa_corporal=indice_de_masa_corporal.map((c)=>{
				if(c.place==place){
					c.place=body["place"];
					c.indice_de_masa_corporal=body["indice_de_masa_corporal"];
				}
			});
			res.sendStatus(200,"OK");
		}
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
	
	
	
	console.log("OK");
}	
