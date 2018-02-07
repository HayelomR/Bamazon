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
  password: "",
  database: "Bamazon_db"
});
connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  connection.query("Select * From products", function(err,res){
  	//console.log(res);
    //action();
  });
  // Lets manager pick action.
  selectAction();
});
//ask the manager what do they want to do
var selectAction = function() {
  inquirer.prompt([
  {
    type: "list",
    name: "action",
    message: "What would you like to do?",
    choices: [
    "View Products for Sale",
    "View Low Inventory",
    "Add to Inventory",
    "Add New Product"
    ]
  }
  ]).then(function(answer) {
    switch (answer.action) {
      case "View Products for Sale":
      viewProducts();
      break;

      case "View Low Inventory":
      viewLowInventory();
      break;

      case "Add to Inventory":
      addInventory();
      break;

      case "Add New Product":
      addProduct();
      break;
    }
  });
};

var viewProducts = function(){
  connection.query("SELECT*FROM products",function(err,res){
    for(var i = 0; i < res.length; i++){
      console.log(res[i].item_id+ "||" + res[i].product_name + "||"
        + res[i].department_name + "||" + res[i].price + "||"
        + res[i].stock_quantity +"\n");
    }
    selectAction();
  })
}

// Displays products with low inventory.
var viewLowInventory = function() {
  var query = "SELECT item_id, product_name,department_name,price, stock_quantity FROM products WHERE stock_quantity < 5";
  connection.query(query, function(err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      console.log("Product ID: " + res[i].item_id + " || Product Name: " + res[i].product_name +" || Department name: " + 
        res[i].department_name + " || Price: " + res[i].price + " || Quantity: " + res[i].stock_quantity);
    }

    // Lets manager select new action.
    selectAction();
  });
};

// Adds new stock to selected product.
var addInventory = function() {

  inquirer.prompt([
  {
    name: "product_ID",
    type: "input",
    message: "Enter product ID that you would like to add stock to."
  },
  {
    name: "stock",
    type: "input",
    message: "How much stock would you like to add?"
  }
  ]).then(function(answer) {
    // Pushes new stock to database.
    connection.query("SELECT * FROM products", function(err, results) {
      var chosenItem;
      for (var i = 0; i < results.length; i++) {
        if (results[i].item_id === parseInt(answer.product_ID)) {
          chosenItem = results[i];
        }
      }
      // add more products in quantity to the existing inventory.
      var updatedStock = parseInt(chosenItem.stock_quantity) + parseInt(answer.stock);
      console.log(answer.stock + " " + chosenItem.product_name  + " " +  "has been added." +
      "Totally you have " +  updatedStock + " " + chosenItem.product_name);
      // put all of this information on to database.
      connection.query("UPDATE products SET ? WHERE ?", [{
        stock_quantity: updatedStock
      }, {
        item_id: answer.product_ID
      }], function (err, res) {
        if (err) {
          throw err;
        } else {
          selectAction();
        }
      });
      
    });

  });
};

// lets add the new product to the database
var addProduct = function() {
  inquirer.prompt([{
    name: "product_name",
    type: "input",
    message: "What is the name of the product that you like to add?"
  }, {
    name: "department_name",
    type: "input",
    message: "Which department would you like to put this product?"
  }, {
    name: "price",
    type: "input",
    message: "What is the price of this product?"
  }, {
    name: "stock_quantity",
    type: "input",
    message: "How much would you like to add?"
  }]).then(function(answer) {
    connection.query("INSERT INTO products SET ?", {
      product_name: answer.product_name,
      department_name: answer.department_name,
      price: answer.price,
      stock_quantity: answer.stock_quantity
    }, function(err, res) {
      if (err) {
        throw err;
      } else {
        console.log("product added successfully!");
      }
    });
  });
};

