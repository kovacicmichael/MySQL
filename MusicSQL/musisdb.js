var mysql = require("mysql");

var connection = mysql.createConnection({
	host: "localhost",
	port: 8889,
	//username
	user: "root",
	//password
	password: "root",
	database: "playlist_db"
});

connection.connect(function(error){
	if(error) throw error;

	//console.log(connection);
	console.log("connected as id " + connection.threadId);

	runQuery();
	queryAlternative();
	queryClassic();
});

function runQuery(){
	connection.query("SELECT * FROM music_data", function(err, res){
		if (err) throw err;
		//console.log(res);
		for(var i = 0; i < res.length; i++){
			console.log(res[i].id + " | " + res[i].Title + " | " + res[i].Artist + " | " + res[i].Genre)
		}
		console.log("------------------------------------");
	});
};

function queryAlternative(){
	connection.query("SELECT * FROM music_data WHERE `Genre` = 'Alternative'", function(err, res){
		if (err) throw err;
		//console.log(res);
		for(var i = 0; i < res.length; i++){
			console.log(res[i].id + " | " + res[i].Title + " | " + res[i].Artist + " | " + res[i].Genre)
		};
		console.log("------------------------------------");
	});	
}

//different syntax
function queryClassic(){
	connection.query("SELECT * FROM music_data WHERE `Genre` = ?", ["Classic Rock"], function(err, res){
		if (err) throw err;
		//console.log(res);
		for(var i = 0; i < res.length; i++){
			console.log(res[i].id + " | " + res[i].Title + " | " + res[i].Artist + " | " + res[i].Genre)
		}
		console.log("------------------------------------");
	});	
}

