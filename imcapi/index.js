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
	db.find({"place" :place},(error, indice_de_masa_corporal)=>{
			if(indice_de_masa_corporal.length==0){
				console.log("ERROR 404. Recurso no encontrado");
				res.sendStatus(404);
			}else{
				res.send(indice_de_masa_corporal.map((i)=>{
					delete i._id;
					return(i);
				}));
				console.log("Recurso mostrado");
			}
		})
		
});	
	
//DELETE CONTACTS
	app.delete(BASE_API_URL+"/indice_de_masa_corporal",(req,res) => {
		if(db.length == 0){
			res.sendStatus(404, "masa corporal NOT FOUND");
		}else{
			db.remove({},{multi:true});
			res.sendStatus(200,"OK")
		}
	});
	
	

//PUT CONTACT/XXX
app.put(BASE_API_URL+"/indice_de_masa_corporal/:place/:year",(req,res) => {
	var place = req.params.place;
	var year = parseInt(req.params.year);
	var updated = req.body;
	db.find({"place":place, "year": year},(error,indice_de_masa_corporal)=>{
		console.log(indice_de_masa_corporal);
		if(indice_de_masa_corporal.length == 0){
			console.log("Error 404, no se ha encontrado el recurso");
			res.sendStatus(404);
			}else if(!updated.place || !updated.indice_de_masa_corporal ||!updated.year || updated.place != place || updated.year != year){				
				console.log("mal uso de put");
				res.sendStatus(400);
				}else{
					db.update({"place":place,"year":year},{$set: updated});
					console.log("recurso actualizado")
					res.sendStatus(200);
				}
	});
	
	
});
//DELETE CONTACT/XXX

app.delete(BASE_API_URL+"/indice_de_masa_corporal/:place",(req,res) => {
	var place = req.params.place;
		db.find({"place":place},(error, indice_de_masa_corporal)=>{
			if(indice_de_masa_corporal.length==0){
				console.log("ERROR 404. Recurso no encontrado");
				res.sendStatus(404);
			}else{
				console.log("borrando recurso especificacio");
                res.sendStatus(200);
                db.remove({ "place":place });
			}
		})
});
	
//DELETE CONTACT/XXX/YYYY
		app.delete(BASE_API_URL+"/indice_de_masa_corporal/:place/:year", (req,res)=>{

		var place = req.params.place;
		var year = parseInt(req.params.year);

		db.find({"place":place, "year":year},(error, indice_de_masa_corporal)=>{			 
			if(indice_de_masa_corporal.length == 0){
				console.log("Error 404, no se ha encontrado el recurso");
				res.sendStatus(404);
			}else{
				console.log("borrando un solo recurso");
                res.sendStatus(200);
				db.remove({ "place":place, "year":year });
			}
		})
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

