// Get mysql
var mysql = require("mysql");
//Get inquirer
var inquirer = require("inquirer");
//connect file with the database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "303261",
  database: "Bamazon_db"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
   connection.query("Select * From products", function(err,res){
  	//console.log(res);
    //action();
   });

});


