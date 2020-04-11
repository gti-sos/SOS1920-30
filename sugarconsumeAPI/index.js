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
	 
	 
	/* app.get("/cool",(request,response) => {
	response.send("<html>"+cool()+"</html>");
});*/
	
	var sugarconsume = [
	{
		place: "Europe",
		sugarconsume: 18800
		
	},
	{
		place: "China",
		sugarconsume: 17500
		
	},
	{
		place: "India",
		sugarconsume: 28000
		
	},
	{
		place: "Turkey",
		sugarconsume: 2300
		
	},
	{
		place: "Ukraine",
		sugarconsume: 1445
		
	}
];
	 
	 
	const base = [
	{
		place: "Europe",
		sugarconsume: 18800
		
	},
	{
		place: "China",
		sugarconsume: 17500
		
	},
	{
		place: "India",
		sugarconsume: 28000
		
	},
	{
		place: "Turkey",
		sugarconsume: 2300
		
	},
	{
		place: "Ukraine",
		sugarconsume: 1445
		
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
	var filteredSugarConsume = sugarconsume.filter((c) =>{
		return (c.place == place);
	});
	if(filteredSugarConsume.length >= 1){
		res.send(filteredSugarConsume[0]);
	}else{
		res.sendStatus(404, "CONTACT NOT FOUND");
	}
		
});
	 
	 //GET SUGARCONSUME

app.get(BASE_API_URL+"/sugarconsume",(req,res) => {
	console.log("New GET .../sugarconsume");
	db.find({}, (err, sugarconsume) => {
			sugarconsume.forEach((c) => {
				delete c._id;
			});
			res.send(JSON.stringify(sugarconsume, null, 2));
			console.log("Data sent:"+JSON.stringify(sugarconsume,null,2));
	});

});
	
	//POST SUGARCONSUME

app.post(BASE_API_URL+"/sugarconsume",(req,res) => {
	var newSugarConsume = req.body;
	if((newSugarConsume == "") || (newSugarConsume.place == null)){
			res.sendStatus(400, "BAD REQUEST(no name provided)");
	}
	else{
		sugarconsume.push(newSugarConsume);
		res.sendStatus(201, "CREATED");
	}
});

	 
	 
	 //POST SUGARCONSUME/XXX

app.post(BASE_API_URL+"/sugarconsume/:place",(req,res) => {
	
		res.sendStatus(405, "METHOD NOT ALLOWED");
	});

	 
	 
	 //PUT SUGARCONSUME/XXX
	
app.put(BASE_API_URL+"/sugarconsume/:place",(req,res) => {
	var place = req.params.place
	var body = req.body;
	var filteredSugarConsume = sugarconsume.filter((c) => {
		return (c.place != place);
	});
	
	if(place = req.body.place){
		sugarconsume = filteredSugarConsume;
		sugarconsume.push(req.body);
		res.sendStatus(200, "OK");
	}else{
		res.sendStatus(404, "NOT FOUND");
	}
	
}
	
);
	

	
	//PUT SUGARCONSUME
app.put(BASE_API_URL+"/sugarconsume",(req,res) => {
	res.sendStatus(405, "METHOD NOT ALLOWED");
});
	
	//DELETE SUGARCONSUME/XXX

app.delete(BASE_API_URL+"/sugarconsume/:place",(req,res) => {
	var place = req.params.place;
	var filteredSugarConsume = sugarconsume.filter((c) =>{
		return (c.place != place);
	});
	if(filteredSugarConsume.length < sugarconsume.length){
		sugarconsume = filteredSugarConsume;
		res.sendStatus(200, "OK");
		
	}else{
		res.sendStatus(404, "SUGARCONSUME PLACE NOT FOUND");
	}
});
	
	
	//DELETE SUGARCONSUME
	app.delete(BASE_API_URL+"/sugarconsume",(req,res) => {
		if(sugarconsume.length == 0){
			res.sendStatus(404, "SUGARCONSUME NOT FOUND");
			
		}else{
			sugarconsume = "";
			res.sendStatus(200,"OK")
		}
	});
	
	 
	 
	 console.log("OK");
}
