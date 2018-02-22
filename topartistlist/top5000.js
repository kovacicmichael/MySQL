var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
	host: "localhost",
	port: 8889,
	user: "root",
	password: "root",
	database: "topSongs_db"
});

connection.connect(function(error){
	if(error) throw error;

	console.log("connected as id " + connection.threadId);

	promptUser();
});


function promptUser(){
	inquirer.prompt([
			{
				type: "checkbox",
				name: "choice",
				message: "What would you like to do?",
				choices: ["Search by Artist", "Search by Song Name", "Search by Range on List", "Search by Artist with Multiple Songs", "Search by Year Range", "QUIT"],
			}
	]).then(function(userResponse){
		if(userResponse.choice == "Search by Artist"){
			console.log("here");
			inquirer.prompt([
					{
						type: "input",
						name: "select",
						message: "What artist would you like to find?"
					}
			]).then(function(artistChoice){

				artistSearch(artistChoice.select);

			})
		}else if(userResponse.choice == "Search by Song Name"){
				inquirer.prompt([
					{
						type: "input",
						name: "select",
						message: "What song would you like to find?"
					}
				]).then(function(songChoice){

						songSearch(songChoice.select);

				})
		}else if(userResponse.choice == "Search by Range on List"){
				inquirer.prompt([
						{
							type: "input",
							name: "start",
							message: "What position would you like to start with?"
						},
						{
							type: "input",
							name: "end",
							message: "What position would you like to end with?"
						}

				]).then(function(response){

					rangeSearch(response.start, response.end);
				})


		}else if(userResponse.choice == "Search by Artist with Multiple Songs"){

			multipleArtist();
		}

	})
}



function artistSearch(userChoice){
	connection.query("SELECT * FROM top5000", function (err, res){
					//console.log(res)
		for(var i = 0; i < res.length; i++){
			if(res[i].artist_name == userChoice){
				console.log("Position: " + res[i].position + " | " + "Artist: " + res[i].artist_name + " | " + "Song: " + res[i].song_name + " | " + "Year: " + res[i].year);
			}
		}
	})
}



function songSearch(userChoice){
	connection.query("SELECT * FROM top5000", function (err, res){
					//console.log(res)
		for(var i = 0; i < res.length; i++){
			if(res[i].song_name == userChoice){
				console.log("Position: " + res[i].position + " | " + "Artist: " + res[i].artist_name + " | " + "Song: " + res[i].song_name + " | " + "Year: " + res[i].year);
			}
		}
	})

}



function rangeSearch(start, end){
	connection.query("SELECT position FROM top5000 WHERE position BETWEEN ? AND ?", [start, end],
		function (err, res){
					//console.log(res)
			for(var i = 0; i < res.length; i++){
					console.log("Position: " + res[i].position + " | " + "Artist: " + res[i].artist_name + " | " + "Song: " + res[i].song_name + " | " + "Year: " + res[i].year);
				}
	})
}



function multipleArtist(){
	connection.query("SELECT * FROM top5000 GROUP BY artist_name HAVING COUNT(artist_name) > 1 ORDER BY artist_name",
		function (err, res){
					//console.log(res)
			for(var i = 0; i < res.length; i++){
					console.log("Position: " + res[i].position + " | " + "Artist: " + res[i].artist_name);
				}
	})
}

// SELECT column-names
//   FROM table-name
//  WHERE condition
//  GROUP BY column-names
// HAVING condition


// con.query("SELECT * FROM top_5000 WHERE year BETWEEN ? AND ?", [response.lowRange, response.highRange], function(error,results,fields) {
//                         listArray = results
//                         for (i=0; i<listArray.length; i++) {
//                             console.log("Ranking: " + listArray[i].position + " Artist: " + listArray[i].artist + " Song: " + listArray[i].song + " Overall Sales: " + listArray[i].raw_total + " US: " + listArray[i].raw_usa + " UK: " + listArray[i].raw_uk + " Europe: " + listArray[i].raw_eur + " Other: " + listArray[i].raw_row + "\n")
//                         }
//                         start()
//                         })
//                     })




