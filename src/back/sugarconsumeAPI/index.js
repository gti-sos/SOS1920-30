module.exports = function (app) {
	console.log("Regidtering sugarconsume API...");
	// const cool = require("cool-ascii-faces");
	const dataStore = require("nedb");
	const path = require("path");
	 
	const dbFileName = path.join(__dirname, "sugarconsume.db");
	const BASE_API_URL = "/api/v3";
	 
	const db = new dataStore({
					filename: dbFileName,
					autoload: true
});
	 	
	var sugarconsume = [
	{
		place: "Europa",
		sugarconsume: 18800,
		year:  2017,
		pg_diabetes: 4,
		poblacion: 741

		
	},
	{
		place: "China",
		sugarconsume: 17500,
		year:  2017,
		pg_diabetes: 4.1,
		poblacion: 1395
		
	},
	{
		place: "India",
		sugarconsume: 28000,
		year:  2017,
		pg_diabetes: 4.2,
		poblacion: 1353
		
	},
	{
		place: "Turquia",
		sugarconsume: 2300,
		year:  2017,
		pg_diabetes: 0.8,
		poblacion: 82
		
	},
	{
		place: "Ucrania",
		sugarconsume: 1580,
		year: 2017,
		pg_diabetes: 0.9,
		poblacion: 41
		
	},
		{
		place: "Europa",
		sugarconsume: 18800,
		year:  2016,
		pg_diabetes: 3.9,
		poblacion: 740
		
	},
	{
		place: "China",
		sugarconsume: 17700,
		year:  2016,
		pg_diabetes: 3.8,
		poblacion: 1393
		
	},
	{
		place: "India",
		sugarconsume: 28000,
		year:  2016,
		pg_diabetes: 4,
		poblacion: 1353
		
	},
	{
		place: "Turquia",
		sugarconsume: 2300,
		year:  2016,
		pg_diabetes: 1.2,
		poblacion: 81
		
	},
	{
		place: "Ucrania",
		sugarconsume: 1580,
		year: 2016,
		pg_diabetes: 0.8,
		poblacion: 41
		
	},{
		place: "Europa",
		sugarconsume: 18700,
		year:  2015,
		pg_diabetes: 3.4,
		poblacion: 738
		
	},
	{
		place: "China",
		sugarconsume: 17558,
		year:  2015,
		pg_diabetes: 3.1,
		poblacion: 1380
		
	},
	{
		place: "India",
		sugarconsume: 27195,
		year:  2015,
		pg_diabetes: 4.3,
		poblacion: 1350
		
	},
	{
		place: "Turquia",
		sugarconsume: 2300,
		year:  2015,
		pg_diabetes: 1,
		poblacion: 80
		
	},
	{
		place: "Ucrania",
		sugarconsume: 1587,
		year: 2015,
		pg_diabetes: 0.7,
		poblacion: 40
		
	}
		
];
	 
	 


	 
	 
	 //LOADINITIALDATA
	 
	 
app.get(BASE_API_URL+"/sugarconsume/loadInitialData",(req,res) => {
	console.log("New GET .../loadInitialData");
	db.insert(sugarconsume);
	res.sendStatus(200);
	console.log("Initial sugarconsume loaded" + JSON.stringify(sugarconsume,null,2));
});
	 
	 //GET SUGARCONSUME/XXX
	 
app.get(BASE_API_URL+"/sugarconsume/:place",(req,res) => {
	var place = req.params.place;
	db.find({"place" :place},(error, sugarconsume)=>{
		if(sugarconsume.length==0){
			console.log("ERROR 404. Recurso no encontrado");
			res.sendStatus(404);
		}else{
			res.send(sugarconsume.map((i)=>{
				delete i._id;
				return(i);
			}));
			console.log("Recurso mostrado");
		}
		
		})
		
});	
	
	
	 
	 //GET SUGARCONSUME/XXX/YYY
	 
app.get(BASE_API_URL+"/sugarconsume/:place/:year",(req,res) => {
	var place = req.params.place;
	var year = parseInt(req.params.year);
	db.find({"place":place, "year": year},(error, sugarconsume)=>{
		if (sugarconsume.length == 1) {
			delete sugarconsume[0]._id;

			res.send(JSON.stringify(sugarconsume[0], null, 2)); 
			
		} else {
			res.sendStatus(404, "NOT FOUND");
		}
		})
		
});	
	 
	
	 //GET SUGARCONSUME

app.get(BASE_API_URL+"/sugarconsume", (req,res) =>{
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
				
				if( (query != "place") && (query != "sugarconsume") && (query != "year")){
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
				if(req.query.sugarconsume){
					search["sugarconsume"] = parseInt(req.query.sugarconsume);
				}
				if(req.query.year){
					search["year"] = parseInt(req.query.year);
				}
			
		db.find(search).sort({place:1,year:-1}).skip(offset).limit(limit).exec((error, sugarconsume) =>{
			console.log("valor del offset: " +offset);
			console.log("valor del limit: " +limit);
			sugarconsume.forEach((r)=>{
				delete r._id
			});
			res.send(JSON.stringify(sugarconsume,null,2));
			console.log("mostrando recursos");
		});
}
	});
	

	
	//POST SUGARCONSUME
app.post(BASE_API_URL+"/sugarconsume",(req,res) => {


	var newSugarconsume = req.body;
	if((newSugarconsume == "") || (newSugarconsume.place == null || newSugarconsume.year == null || newSugarconsume.pg_diabetes == null || newSugarconsume.poblacion == null)){
			res.sendStatus(400, "BAD REQUEST(no name provided or no year provided)");
	}
	else{
		

		db.insert(newSugarconsume);
		res.sendStatus(201, "CREATED");
	}

});


	 
	 
	 //POST SUGARCONSUME/XXX

app.post(BASE_API_URL+"/sugarconsume/:place",(req,res) => {
	
		res.sendStatus(405, "METHOD NOT ALLOWED");
	});

	 
	 
	 //PUT SUGARCONSUME/XXX/YYY
	
app.put(BASE_API_URL+"/sugarconsume/:place/:year",(req,res) => {
	var place = req.params.place;
	var year = parseInt(req.params.year);
	var updated = req.body;
	db.find({"place":place, "year": year},(error,sugarconsume, pg_diabetes, poblacion)=>{
		console.log(sugarconsume);
		if(sugarconsume.length == 0){
			console.log("Error 404, no se ha encontrado el recurso");
			res.sendStatus(404);
			}else if(!updated.place || !updated.year  || updated.place != place || updated.year != year){				
				console.log("mal uso de put");
				res.sendStatus(400);
				}else{
					db.update({"place":place,"year":year},{$set: updated});
					console.log("recurso actualizado")
					res.sendStatus(200);
				}
	});
	
	
});



	//PUT SUGARCONSUME/XXX
app.put(BASE_API_URL+"/sugarconsume/:place",(req,res) => {
	var place = req.params.place;
	res.sendStatus(405, "METHOD NOT ALLOWED");
});
	
	
	//PUT SUGARCONSUME
app.put(BASE_API_URL+"/sugarconsume",(req,res) => {
	res.sendStatus(405, "METHOD NOT ALLOWED");
});
	
	//DELETE SUGARCONSUME/XXX

app.delete(BASE_API_URL+"/sugarconsume/:place",(req,res) => {
	var place = req.params.place;
		db.find({"place":place},(error, sugarconsume)=>{
			if(sugarconsume.length==0){
				console.log("ERROR 404. Recurso no encontrado");
				res.sendStatus(404);
			}else{
				console.log("borrando recurso especificacio");
                res.sendStatus(200);
                db.remove({"place":place}, {multi:true});
			}
		})
});
	
		//DELETE SUGARCONSUME/XXX/YYY

app.delete(BASE_API_URL+"/sugarconsume/:place/:year", (req,res)=>{

		var place = req.params.place;
		var year = parseInt(req.params.year);

		db.find({"place":place, "year":year},(error, sugarconsume)=>{			 
			if(sugarconsume.length == 0){
				console.log("Error 404, no se ha encontrado el recurso");
				res.sendStatus(404);
			}else{
				console.log("borrando un solo recurso");
                res.sendStatus(200);
				db.remove({ "place":place, "year":year });
			}
		})
	});
	
	//DELETE SUGARCONSUME
	app.delete(BASE_API_URL+"/sugarconsume",(req,res) => {
		if(db.length == 0){
			res.sendStatus(404, "NOT FOUND");
		}else{
			db.remove({},{multi:true});
			res.sendStatus(200,"OK")
		}
	});
	
	
	
	
	
	
	//DELETE SUGARCONSUME/XXX/YYYY

		app.delete(BASE_API_URL+"/sugarconsume/:place/:year", (req,res)=>{

		var place = req.params.place;
		var year = parseInt(req.params.year);

		db.find({"place":place, "year":year},(error, sugarconsume)=>{			 
			if(sugarconsume.length == 0){
				console.log("Error 404, no se ha encontrado el recurso");
				res.sendStatus(404);
			}else{
				console.log("borrando un solo recurso");
                res.sendStatus(200);
				db.remove({ "place":place, "year":year });
			}
		})
	});
	
	 
	 
	 console.log("OK2");
}