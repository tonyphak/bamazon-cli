var inquirer = require("inquirer");
var mysql = require("mysql");
//get connection to mysql db
var connection = mysql.createConnection({
    host: "127.0.0.1",

    port: 3306,

    user: "root",

    password: "",
    database: "bamazon_DB"
});
//confirn connection
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    //start bamazon
    viewProducts()
});
//function that shows table using mysql query
function viewProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.table(res);
        inquirer
            .prompt([
                {
                    type: "input",
                    name: "id",
                    message: "What is the ID of the product that you want to buy?",
                    //validate function to confirm if customers' response is number between 0 and 10
                    validate: function (value) {
                        if (isNaN(value) === false && parseInt(value) > 1 && parseInt(value) <= 20) {
                            return true;
                        }
                        return "Please choose a valid ID";
                    }
                },
                {
                    type: "input",
                    name: "quantity",
                    message: "How much do you want to buy?",
                    //validate function to make sure customer provides a number
                    validate: function (value) {
                        if (isNaN(value)) {
                            return "Please choose a number quantity"
                        } else {
                            return true
                        }
                    }
                }
            ]).then(function (answer) {
                var custQuantity = parseInt(answer.quantity);
                var totalCost = parseFloat(res[answer.id - 1].price * custQuantity.toFixed(2));
                if (custQuantity >= res[answer.id - 1].stock_quantity) {
                    console.log("Insufficient Quantity");
                    viewProducts();
                } else {
                    var stockQuant = res[answer.id - 1].stock_quantity
                    //use mysql query to update table
                    connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [
                            {
                                //update stock_quantity data set
                                stock_quantity: stockQuant - custQuantity
                            },
                            {
                                //indicate where to update
                                item_id: answer.id
                            }
                        ],
                        function (error) {
                            if (error) throw err;
                            console.log("Purchase was a success! You have purchased " + custQuantity + " " +
                                res[answer.id - 1].product_name + " for a total cost of $" + totalCost);
                        }
                    );
                    connection.query("UPDATE products SET ? WHERE ?", [
                        { product_sales: totalCost + res[answer.id - 1].product_sales },
                        { product_name: res[answer.id - 1].product_name }
                    ], function (err, res) {
                        if (err) throw err;
                        console.log("product sales updated!");
                        reorderPrompt();
                    }
                    )
                }
            })
    })
}

function reorderPrompt() {
    //use inquirer and type choose to continue shopping or exit
    inquirer
        .prompt([
            {
                name: "customerChoice",
                type: "rawlist",
                message: "Do you want to continue to [SHOP] or [EXIT]?",
                choices: ["SHOP", "EXIT"]
            }
        ])
        .then(function (answer) {
            if (answer.customerChoice.toUpperCase() === "SHOP") {
                //continue shopping function
                viewProducts();
            }
            else {
                console.log("Please come again!");
                connection.end();
            }
        });
}

