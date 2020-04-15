module.exports = function (app) {
	console.log("Regidtering sugarconsume API...");
	// const cool = require("cool-ascii-faces");
	const dataStore = require("nedb");
	const path = require("path");
	 
	const dbFileName = path.join(__dirname, "sugarconsume.db");
	const BASE_API_URL = "/api/v1";
	 
	const db = new dataStore({
					filename: dbFileName,
					autoload: true
});
	 
	
	
	var sugarconsume = [
	{
		place: "Europe",
		sugarconsume: 18800,
		year:  2017
		
	},
	{
		place: "China",
		sugarconsume: 17500,
		year:  2017
		
	},
	{
		place: "India",
		sugarconsume: 28000,
		year:  2017
		
	},
	{
		place: "Turkey",
		sugarconsume: 2300,
		year:  2017
		
	},
	{
		place: "Ukraine",
		sugarconsume: 1580,
		year: 2017
		
	},
		{
		place: "Europe",
		sugarconsume: 18800,
		year:  2016
		
	},
	{
		place: "China",
		sugarconsume: 17700,
		year:  2016
		
	},
	{
		place: "India",
		sugarconsume: 28000,
		year:  2016
		
	},
	{
		place: "Turkey",
		sugarconsume: 2300,
		year:  2016
		
	},
	{
		place: "Ukraine",
		sugarconsume: 1580,
		year: 2016
		
	},{
		place: "Europe",
		sugarconsume: 18700,
		year:  2015
		
	},
	{
		place: "China",
		sugarconsume: 17558,
		year:  2015
		
	},
	{
		place: "India",
		sugarconsume: 27195,
		year:  2015
		
	},
	{
		place: "Turkey",
		sugarconsume: 2300,
		year:  2015
		
	},
	{
		place: "Ukraine",
		sugarconsume: 1587,
		year: 2015
		
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
	if((newSugarconsume == "") || (newSugarconsume.place == null || newSugarconsume.year == null)){
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
	db.find({"place":place, "year": year},(error,sugarconsume)=>{
		console.log(sugarconsume);
		if(sugarconsume.length == 0){
			console.log("Error 404, no se ha encontrado el recurso");
			res.sendStatus(404);
			}else if(!updated.place || !updated.sugarconsume ||!updated.year || updated.place != place || updated.year != year){				
				console.log("mal uso de put");
				res.sendStatus(400);
				}else{
					db.update({"place":place,"year":year},{$set: updated});
					console.log("recurso actualizado")
					res.sendStatus(200);
				}
	});
	
	
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
                db.remove({ "place":place });
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
	
	 
	 
	 console.log("OK");
}
