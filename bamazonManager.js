var inquirer = require("inquirer");
var mysql = require("mysql");
//get connection to mysql db
var connection = mysql.createConnection({
    host: "127.0.0.1",

    port: 3306,

    user: "root",

    password: "rontayan",
    database: "bamazon_DB"
});
connection.connect(function (err) {
    if (err) throw err;
    managerMenu();
});

function managerMenu() {
    inquirer
        .prompt({
            name: "action",
            type: "rawlist",
            message: "Hi Manager, what would you like to do?",
            choices: [
                "View Prodcuts for Sale",
                "View Low Inventory",
                "Add to Inventory",
                "Add New Product"
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "View Prodcuts for Sale":
                    saleSearch();
                    break;
                case "View Low Inventory":
                    lowInventory();
                    break;
                case "Add to Inventory":
                    addInventory();
                    break;
                case "Add New Product":
                    addProduct();
                    break;
            }
        });
}

function saleSearch() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.table(res);
        managerMenu();
    });
}

function lowInventory() {
    //products with inventory count lower than 5
    var query = "SELECT * FROM products";
    connection.query(query, function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            if (res[i].stock_quantity <= 5) {
                console.table(res[i]);
            }
        }
        managerMenu();
    })
}

function addInventory() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        //create empty array to use with prompt choices
        var itemArr =[];
        for(var i=0; i< res.length; i++){
            itemArr.push(res[i].product_name);
        }
        inquirer
            .prompt([
                {
                    name: "addItem",
                    type: "list",
                    message: "Which product do you want to stock up?",
                    //displays choices form array
                    choices: itemArr
                },
                {
                    name: "addQty",
                    type: "input",
                    message: "How much do you want to add to the stock?",
                    validate: function (value) {
                        if (isNaN(value) === false) {
                            return true;
                        }else
                        return false;
                    }
                },
            ])
        .then(function (answer) {
            //create var to store quantity information for chosen product
            var currentQuant
            for(var i=0; i<res.length; i++){
                if(res[i].product_name ===answer.addItem){
                    //store quantity info in new var of current product
                    currentQuant = res[i].stock_quantity;
                }
            }
            connection.query("UPDATE products SET ? WHERE ?",
                [
                    {
                        stock_quantity: currentQuant + parseInt(answer.addQty)
                    },
                    {
                        product_name: answer.addItem
                    }
                ],
                function (err) {
                    if (err) throw err;
                    console.log("Product Quantity updated!");
                    managerMenu();
                })
        })
    })
}


function addProduct() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: "newItem",
                    type: "input",
                    message: "Which new product would you like to add?",
                },
                {
                    name: "department",
                    type: "input",
                    message: "Which department does this product belong?"
                },
                {
                    name: "price",
                    type: "input",
                    message: "How much is this product?",
                    validate: function (value) {
                        if (isNaN(value) === false) {
                            return true;
                        }
                        return false;
                    },
                },
                {
                    name: "quantity",
                    type: "input",
                    message: "How many of the product do you want to stock?",
                    validate: function (value) {
                        if (isNaN(value) === false) {
                            return true;
                        }
                        return false;
                    },
                },
            ])
            .then(function (answer) {
                var query = "INSERT INTO products SET ?";
                connection.query(query,
                    {
                        product_name: answer.newItem,
                        department_name: answer.department,
                        price: answer.price,
                        stock_quantity: answer.quantity
                    },
                    function (err) {
                        if (err) throw err;
                        console.log("New product has been added!");
                        managerMenu();
                    }
                );
            });
    })
}
