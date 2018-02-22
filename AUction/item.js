var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
	host: "localhost",
	port: 8889,
	//username
	user: "root",
	//password
	password: "root",
	database: "greatBay_db"
});

var itemsArray = [];
var bids = [];
p
connection.connect(function(error){
	if(error) throw error;

	//console.log(connection);
	console.log("connected as id " + connection.threadId);

	runQuery();
	//queryAlternative();
	//queryClassic();
	inquire();
});





function runQuery(){
	connection.query("SELECT * FROM items", function(err, res){
		if (err) throw err;
		//console.log(res);
		for(var i = 0; i < res.length; i++){
			//console.log(res[i].id + " | " + res[i].item_name + " | " + res[i].category + " | " + res[i].starting_bid + " | " +res[i].highest_bid)
			itemsArray.push(res[i].item_name);
			
		}
		//console.log(itemsArray);
		//console.log("------------------------------------");
	});
};

function display(){
	connection.query("SELECT * FROM items", function(err, res){
		if (err) throw err;
		//console.log(res);
		itemsArray = [];
		for(var i = 0; i < res.length; i++){
			console.log(res[i].id + " | " + res[i].item_name + " | " + res[i].category + " | " + res[i].starting_bid + " | " +res[i].highest_bid)
			itemsArray.push(res[i].item_name);
		}
		//console.log(itemsArray);
		inquire();
	})
};





function inquire(){
	inquirer.prompt([
			{
				type: "rawlist",
				name: "command",
				message: "Would you like to 'post' an item or 'bid' on an item?",
				choices: ["post", "bid", "quit"]
			}
		]).then(function(answers){
			if(answers.command == "post"){
				inquirer.prompt([
						{
							type: "input",
							name: "item_name",
							message: "What is your item?"
						},
						{
							type: "input",
							name: "category",
							message: "What category is your item under?"
						}
				]).then(function(responses){
					
					createQuery(responses.item_name, responses.category);
				})
			}else if(answers.command == "bid"){
				//console.log(itemsArray);
				inquirer.prompt([
						{
							type: "rawlist",
							name: "item",
							message: "What item do you want to bid on?",
							choices: itemsArray

						},
						{
							type: "number",
							name: "bid",
							message: "What is your bid?"
						}
				]).then(function(responses){

					// if(responses.bid > )
					//updateQuery(responses.item, responses.bid);
					connection.query("SELECT * FROM items WHERE ?", {item_name: responses.item}, function(err, res){
						if (err) throw err;
						// console.log(res)
						// console.log(res[0].highest_bid);
							
							if(res[0].starting_bid == 0){

								updateStarting(responses.item, responses.bid);
								updateQuery(responses.item, responses.bid);

							}else if(res[0].highest_bid < responses.bid){

								updateQuery(responses.item, responses.bid);

							}else{
								console.log("Your bid was too low!")
								inquire();
							}
					});
			})
			}else if(answers.command == "quit"){
					return;
			}
		})
}
function createQuery(item_name, category){
	console.log("Inserting a new product...\n");
	var query = connection.query(
		"INSERT INTO items SET ?",
		{
			item_name: item_name,
			category: category,
			starting_bid: 0,
			highest_bid: 0
		},
		function(err, res){
			if(err) throw err;
			console.log("Dataset inserted!\n");
			//updateQuery();
			//itemsArray.push(res[0].item_name)
			display();
		}
	);
}

function updateQuery(item, bid){
	console.log("Updating bid for your selected item\n");
	var query = connection.query(
	    "UPDATE items SET ? WHERE ?",
	    [
	      {
	        highest_bid: bid
	      },
	      {
	        item_name: item
	      }
	    ],
	    function(err, res){
	    	if(err) throw err;
	    	console.log("Bid accepted!\n");
	    	console.log("You now have the highest bid!\n");
	    	display();
	    }
	);
}

function updateStarting(item, bid){
	var query = connection.query(
	    "UPDATE items SET ? WHERE ?",
	    [
	      {
	        starting_bid: bid
	      },
	      {
	        item_name: item
	      }
	    ],
	    function(err, res){
	    	if(err) throw err;
	    }
	);
}