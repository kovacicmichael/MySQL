var mysql = require("mysql");

var connection = mysql.createConnection({
	host: "localhost",
	port: 8889,
	//username
	user: "root",
	//password
	password: "root",
	database: "ice_creamDB"
});

connection.connect(function(error){
	if(error) throw error;

	//console.log(connection);
	console.log("connected as id " + connection.threadId); 
})