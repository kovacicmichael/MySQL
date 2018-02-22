var mysql = require("mysql");
var inquirer = require("inquirer");

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

	//runQuery();
	//queryAlternative();
	//queryClassic();
	inquire();
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


function inquire(){
	inquirer.prompt([
			{
				type: "input",
				name: "command",
				message: "Would you like to add, ammend, or delete and item?"
			}
		]).then(function(answers){
			if(answers.command == "add"){
				inquirer.prompt([
						{
							type: "input",
							name: "title",
							message: "What is the song title?"
						},
						{
							type: "input",
							name: "artist",
							message: "What is the Artist's name?"
						},
						{
							type: "input",
							name: "genre",
							message: "What genre is this song?"
						}
				]).then(function(responses){
					
					createQuery(responses.title, responses.artist, responses.genre);
				})
			}
		})
}



function createQuery(title, artist, genre){
	console.log("Inserting a new product...\n");
	var query = connection.query(
		"INSERT INTO music_data SET ?",
		{
			Title: title,
			Artist: artist,
			Genre: genre
		},
		function(err, res){
			if(err) throw err;
			console.log(res.affectedRows + "dataset inserted!\n");
			//updateQuery();
			runQuery();
		}
	);
}

// function updateQuery(){
// 	console.log("Updating genre for George Ezra...\n");
// 	var query = connection.query(
// 	    "UPDATE music_data SET ? WHERE ?",
// 	    [
// 	      {
// 	        Genre: "Indie"
// 	      },
// 	      {
// 	        Artist: "George Ezra"
// 	      }
// 	    ],
// 	    function(err, res){
// 	    	if(err) throw err;
// 	    	console.log(res.affectedRows + "dataset updated!\n");
// 	    	deleteQuery();
// 	    }
// 	);
// }

// function deleteQuery(){
// 	console.log("Deleting Artist Hozier...\n");
// 	var query = connection.query(
// 		"DELETE FROM music_data WHERE ?",
// 		{
// 			Artist: "Hozier"
// 		},
// 		function(err, res){
// 			if(err) throw err;
// 			console.log(res.affectedRows + "dataset deleted!\n");
// 			runQuery();
// 		}
// 	);
// };

// function runQuery(){
// 	connection.query("SELECT * FROM music_data", function(err, res){
// 		if (err) throw err;
// 		//console.log(res);
// 		for(var i = 0; i < res.length; i++){
// 			console.log(res[i].id + " | " + res[i].Title + " | " + res[i].Artist + " | " + res[i].Genre)
// 		}
// 		console.log("------------------------------------");
// 	});
// };

// function queryAlternative(){
// 	connection.query("SELECT * FROM music_data WHERE `Genre` = 'Alternative'", function(err, res){
// 		if (err) throw err;
// 		//console.log(res);
// 		for(var i = 0; i < res.length; i++){
// 			console.log(res[i].id + " | " + res[i].Title + " | " + res[i].Artist + " | " + res[i].Genre)
// 		};
// 		console.log("------------------------------------");
// 	});	
// }

// //different syntax
// function queryClassic(){
// 	connection.query("SELECT * FROM music_data WHERE `Genre` = ?", ["Classic Rock"], function(err, res){
// 		if (err) throw err;
// 		//console.log(res);
// 		for(var i = 0; i < res.length; i++){
// 			console.log(res[i].id + " | " + res[i].Title + " | " + res[i].Artist + " | " + res[i].Genre)
// 		}
// 		console.log("------------------------------------");
// 	});	
// }

