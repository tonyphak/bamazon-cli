# Bamazon App using Command Line Interface
## Bamazon an Amazon Competitor App
User will be able look at a list of items and select the items he/she wants to buy. User will also be able to make changes to the list of items and its' information. The items has information such as the department they belong to as well as the stock quantity information
## Motivation
I wanted to create an app that will be able to add items to a database using mysql. I wanted the app to be able to make changes to the database based on prompts and user input.
## Screenshots
1. SQL Database - Below is the schema and seeds used for the SQL bamazon database

![Image of question screen](https://github.com/tonyphak/bamazon-cli/blob/master/images/SQL%20SCHEMA.png)

2. Bamazon for Customers - As a customer, the user will be prompted to enter the ID of the product he/she would like to purchase. The user will also be prompted to enter the quantity he/she would like to purchase. After purchasing, the app will confirm the amount bought and the total cost of the purchase. If the requested quantity is higher than stock quantity, the app will state "Insufficient Funds." The database will be updated showing the less amount that was purchased.

![Image of question screen](https://github.com/tonyphak/bamazon-cli/blob/master/images/01.Custs.gif)

3. Bamazon for Managers - As a manager, the user will be prompted with a menu of options. Depending on the option the user chooses, he/she can view the sales of amount for each product, determime which product needs to be restocked, and add a new product.

![Image of question screen](https://github.com/tonyphak/bamazon-cli/blob/master/images/03.mgrview.gif)

4. Bamazon for Supervisors - As a supervisor, the user will be prompted with a menu that will allow him/her to make changes to the departments. The user can see the total profit for each department or be able to create a brand new department and enter the over head costs for running that department.

![Image of question screen](https://github.com/tonyphak/bamazon-cli/blob/master/images/02.Suprv.gif)

## Technologies Used
* Node.js
* NPM (Inquirer)
* SQL
## Prerequisites
* NPM Inquirer - https://www.npmjs.com/package/inquirer (to access NPM Inquirer)
* NPM MySql - https://www.npmjs.com/package/mysql (to access mysql via NPM install)
## Built With
* Visual Studio Code: Editor
* Bash Terminal
* MySql WorkBench
## Authors
* Tony Phakasoum - Node.js/NPM/SQL   - [Tony Phakasoum](https://github.com/tonyphak)

