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
    //updateProduct();
    showTable();
  });

});
// function updateProduct() {
//   console.log("Updating all Rocky Road quantities...\n");
//   var query = connection.query(
//     "UPDATE products SET ? WHERE ?",
//     [
//       {
//         stock_quantity: 4900
//       },
//       {
//         product_name: "Cd"
//       }
//     ],function(err, res) {
//       console.log(res.affectedRows + " products updated!\n");
//       // Call deleteProduct AFTER the UPDATE completes
//       showTable();
//     }
//   );
//   // logs the actual query being run
//   console.log(query.sql);
// }
// function to show the data avaliable on the screen.
var showTable = function(){
  connection.query("SELECT*FROM products",function(err,res){
    for(var i = 0; i < res.length; i++){
      console.log(res[i].item_id+ "||" + res[i].product_name + "||"
        + res[i].department_name + "||" + res[i].price + "||"
        + res[i].stock_quantity +"\n");
    }
    promptCustomer(res);
  })
}

// a function that will ask for the customer quantity
var promptCustomer = function(res){
  inquirer.prompt([{
    name:"choice",
    type:"input",
    message:"what is the Id of the product you are looking for?"

  }]).then(function(answer) {
    var correct = false;
    for(var i = 0; i < res.length; i++){
      if(res[i].item_id == answer.choice){
        correct = true;
        var product = answer.choice;
        var id =i;
        inquirer.prompt({
          type:"input",
          name:"quantity",
          message:"How many would you like to buy?",
          // validate:function(value){
          //   if(isNaN(value) == false){
          //     return true;
          //   } else {
          //     return false;
          //   }
          // }

        }).then(function(answer){
        //var query = "Select stock_quantity, price, department_name FROM products WHERE ?";
        if(res[id].stock_quantity - answer.quantity){
         connection.query("UPDATE products SET stock_quantity= '" 
          +(res[id].stock_quantity - answer.quantity) + "' WHERE item_id ='" + product 
          +"'",function(err,res2){
            console.log("you added " + answer.quantity + " " + res[id].product_name + " " + "to your cart.");
            console.log("the total price on your cart is: " + "$" + answer.quantity * res[id].price);
            ask()
            //checkQuantity();
          })
       }
        // } else {
        //   console.log("Not a valid selection!");
        //   promptCustomer(res);
        // }
      })
      }
    }
    if(i = res.length && correct == false){
      console.log("not a valid selection. Please choose from the above id of products.");
      promptCustomer();
    }
    
  })
}

function ask (){
  inquirer.prompt([ {
    type: "list",
    name: "choice",
    message: "Do you want to buy more products?",
    choices:["Yes", "No"]
  } ]).then(function(answer){
    if(answer.choice == "Yes"){
      showTable();
    } else {
      console.log("\n please pay the above price to the cashier. Thankyou for shopping with us & have a great day\n"); 
    }
  });
}

// function checkQuantity(answer){
//  if (answer.stock_quantity > item_id[id].stock_quantity) {
//   console.log("please choose the right amount.")
// } else{
//   showTable();
// }
// }


