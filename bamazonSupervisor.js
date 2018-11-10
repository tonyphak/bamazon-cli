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
connection.connect(function (err) {
    if (err) throw err;
    supervMenu();
});
function supervMenu() {
    inquirer
        .prompt({
            name: "action",
            type: "rawlist",
            message: "Hi Supervisor, what would you like to do?",
            choices: [
                "View Product Sales by Department",
                "Create New Department",
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "View Product Sales by Department":
                    saleDept();
                    break;
                case "Create New Department":
                    newDept();
                    break;
            }
        }); 
}

function saleDept(){
    var query = "SELECT departments.department_id, departments.department_name, departments.over_head_costs, products.product_sales, ";
    query +="products.product_sales - departments.over_head_costs AS total_profit FROM departments INNER JOIN products ";
    query +="ON departments.department_name = products.department_name";
    connection.query(query, function(err, res){
        if (err) throw err;
        console.table(res);
        supervMenu();
    })
}

function newDept(){
    connection.query("SELECT * FROM departments", function(err, res){
        //console.table(res);
        if (err) throw err;
        inquirer
        .prompt([
            {
                name:"newdept",
                type:"input",
                message:"What is the name of the new department?"
            },
            {
                name:"overhead",
                type:"input",
                message:"What is the overhead cost for the new Department?",
                validate: function(value){
                    if(isNaN(value)===false){
                        return true;
                    } return false;
                },
            },
        ])
        .then(function (answer){
            connection.query("INSERT INTO departments SET ?",
            {
                department_name: answer.newdept,
                over_head_costs: answer.overhead
            },
            function(err, res){
                if (err) throw (err);
                console.log("New department added!")
                supervMenu();
            })
        })
    })
}
