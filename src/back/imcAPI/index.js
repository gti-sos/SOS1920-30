module.exports = function (app) {
	console.log("Regirecting imcapi...");
	const dataStore = require("nedb");
	const path = require("path");
	const parametros = 2;
	//app.get("/cool",(request,response) => {
//	response.send("<html>"+cool()+"</html>");
//});
	const dbFileName = path.join(__dirname,"/indice_de_masa_corporal.db");
	 
	const db = new dataStore({
					filename: dbFileName,
					autoload: true
});
var initialimc = [
	{
		place: "Alemania",
		indice_de_masa_corporal: 65.98,
		year: 2019,
		altura: 172.9,
		tasa_obesidad:0.20
	},
	{
		place: "Polonia",
		indice_de_masa_corporal: 96.32,
		year: 2019,
		altura: 173.6,
		tasa_obesidad:0.19
		
	},
	{
		place: "Hungria",
		indice_de_masa_corporal: 59.45,
		year: 2019,
		altura: 170.9,
		tasa_obesidad:0.22
		
	},
	{
		place: "Alemania",
		indice_de_masa_corporal: 78.13,
		year: 2020,
		altura: 173,
		tasa_obesidad:0.19
		
	},
	{
		place: "Polonia",
		indice_de_masa_corporal: 73.68,
		year: 2020,
		altura: 172.7,
		tasa_obesidad:0.20
		
	},
	{
		place: "Hungria",
		indice_de_masa_corporal: 23.13,
		year: 2020,
		altura: 170.2,
		tasa_obesidad:0.21
		
	},{
		place: "Alemania",
		indice_de_masa_corporal: 103.2,
		year: 2018,
		altura: 172.9,
		tasa_obesidad:0.20
	},
	{
		place: "Polonia",
		indice_de_masa_corporal: 89.4,
		year: 2018,
		altura: 173.6,
		tasa_obesidad:0.19
		
	},
	{
		place: "Hungria",
		indice_de_masa_corporal: 32.13,
		year: 2018,
		altura: 170.9,
		tasa_obesidad:0.22	
	},
	{
		place: "China",
		indice_de_masa_corporal: 23.78,
		year: 2019,
		altura: 173.2,
		tasa_obesidad:0.18
		
	},
	{
		place: "Belgica",
		indice_de_masa_corporal: 24.15,
		year: 2019,
		altura: 172.9,
		tasa_obesidad:20.2
		
	},
	{
		place: "China",
		indice_de_masa_corporal: 65.86,
		year: 2020,
		altura: 172.9,
		tasa_obesidad:0.19
		
	},
	{
		place: "China",
		indice_de_masa_corporal: 40.52,
		year: 2018,
		altura: 172.9,
		tasa_obesidad:0.19
		
	},
	{
		place: "Belgica",
		indice_de_masa_corporal: 51.93,
		year: 2020,
		altura: 173.4,
		tasa_obesidad:0.19
		
	},{
		place: "Belgica",
		indice_de_masa_corporal: 65.93,
		year: 2018,
		altura: 173.4,
		tasa_obesidad:0.19
		
	}
	
];























//API V3(lño unico nuevo es que he añadido los valores que me faltaban en los primeros)
const BASE_API_URLv3 = "/api/v3";

//Loadinitialdata
app.get(BASE_API_URLv3+"/indice_de_masa_corporal/loadInitialData",(req,res) => {
	
	console.log("New Get .../indice_de_masa_corporal/loadInitialData")

db.insert(initialimc);
res.sendStatus(200, "CREATED");
console.log("Initialdata sent:"+JSON.stringify(initialimc,null,2));
});


//GET CONTACTS
app.get(BASE_API_URLv3+"/indice_de_masa_corporal", (req,res) =>{

let offset = 0;
let limit = Number.MAX_SAFE_INTEGER;
   if (req.query.offset) {
		offset = parseInt(req.query.offset);
		delete req.query.offset;
	}

	if (req.query.limit) {
		limit = parseInt(req.query.limit);
		delete req.query.limit;
	}
	
let error_400 = false;
		
		for(query in req.query){
			
			if( (query != "place") && (query != "indice_de_masa_corporal") && (query != "year")){
				error_400 = true;
			}
		}
		if(error_400){
			res.sendStatus(400, "ERROR IN DATA FIELDS.");
		}
		else{
			
			var search = {};
			
			if(req.query.place){
				search["place"] = req.query.place;
			} 
			if(req.query.indice_de_masa_corporal){
				search["indice_de_masa_corporal"] = parseInt(req.query.indice_de_masa_corporal);
			}
			if(req.query.year){
				search["year"] = parseInt(req.query.year);
			}

		
	db.find(search).sort({place:1,year:-1}).skip(offset).limit(limit).exec((error, indice_de_masa_corporal) =>{
		console.log("valor del offset: " +offset);
		console.log("valor del limit: " +limit);
		indice_de_masa_corporal.forEach((r)=>{
			delete r._id
		});
		res.send(JSON.stringify(indice_de_masa_corporal,null,2));
		console.log("mostrando recursos");
	});
}
});
//POST CONTACTS
app.post(BASE_API_URLv3+"/indice_de_masa_corporal",(req,res) => {
var newindice_de_masa_corporal = req.body;
if((newindice_de_masa_corporal == "") || (newindice_de_masa_corporal.place == null) || (newindice_de_masa_corporal.tasa_obesidad == null) || (newindice_de_masa_corporal.altura == null) || (newindice_de_masa_corporal.year == null)){
		res.sendStatus(400, "BAD REQUEST(not all data provided)");
}
else{
	db.insert(newindice_de_masa_corporal);
	res.sendStatus(201, "CREATED");
}
});





//GET CONTACT/XXX
app.get(BASE_API_URLv3+"/indice_de_masa_corporal/:place",(req,res) => {
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
//GET CONTACT/XXX/YYYY
app.get(BASE_API_URLv3+"/indice_de_masa_corporal/:place/:year",(req,res) => {
var place = req.params.place;
var year = parseInt(req.params.year);
db.find({"place":place, "year": year},(error, indice_de_masa_corporal)=>{
		if(indice_de_masa_corporal.length==0){
			console.log("ERROR 404. Recurso no encontrado");
			res.sendStatus(404);
		}else if(indice_de_masa_corporal.length==1){
			//res.send(indice_de_masa_corporal.map((i)=>{
			//	delete i._id;
			//	return(i[0]);
			//}));
			delete indice_de_masa_corporal[0]._id;
			res.send(JSON.stringify(indice_de_masa_corporal[0],null,2));
			console.log("Recurso mostrado");
		}
	})
	
});	
//DELETE CONTACTS
app.delete(BASE_API_URLv3+"/indice_de_masa_corporal",(req,res) => {
	if(db.length == 0){
		res.sendStatus(404, "masa corporal NOT FOUND");
	}else{
		db.remove({},{multi:true});
		res.sendStatus(200,"OK")
	}
});



//PUT CONTACT/XXX
app.put(BASE_API_URLv3+"/indice_de_masa_corporal/:place/:year",(req,res) => {
var place = req.params.place;
var year = parseInt(req.params.year);
var updated = req.body;
db.find({"place":place, "year": year},(error,indice_de_masa_corporal)=>{
	console.log(indice_de_masa_corporal);
	if(indice_de_masa_corporal.length == 0){
		console.log("Error 404, no se ha encontrado el recurso");
		res.sendStatus(404);
		}else if(!updated.place ||!updated.altura ||!updated.tasa_obesidad || !updated.indice_de_masa_corporal ||!updated.year || updated.place != place || updated.year != year){				
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

app.delete(BASE_API_URLv3+"/indice_de_masa_corporal/:place",(req,res) => {
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
	app.delete(BASE_API_URLv3+"/indice_de_masa_corporal/:place/:year", (req,res)=>{

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

app.post(BASE_API_URLv3+"/indice_de_masa_corporal/:place",(req,res) => {

	res.sendStatus(405, "METHOD NOT ALLOWED");
});

//PUT CONTACT
app.put(BASE_API_URLv3+"/indice_de_masa_corporal/place:",(req,res) => {
	res.sendStatus(405, "METHOD NOT ALLOWED");
	});
	

//PUT CONTACT
app.put(BASE_API_URLv3+"/indice_de_masa_corporal",(req,res) => {
res.sendStatus(405, "METHOD NOT ALLOWED");
});

	console.log("OK");
}	