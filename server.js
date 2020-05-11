const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');

// create the connection information for the sql database
const connection = mysql.createConnection({
    host: "localhost",
    
    // Your port; if not 3306
    port: 3306,
    
    // Your username
    user: "newuser",
    
    // Your password
    password: "Mac1196!",
    database: "company_db"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
});

// function which prompts the user for what action they should take
function start() {
    inquirer
    .prompt({
        // VIEW ADD OR UPDATE
        name: "viewAddUpdate",
        type: "list",
        message: "Would you like to [VIEW], [ADD TO], or [UPDATE] the company database?",
        choices: ["VIEW", "ADD TO", "UPDATE"]
    })
    .then(function(answer) {
        if (answer.viewAddUpdate === "VIEW") {
            view();
        }
        else if(answer.viewAddUpdate === "ADD TO") {
            addTo();
        }
        else if(answer.viewAddUpdate === "UPDATE") {
            update();
        }
        else{
            connection.end();
        }
    });
}

// MYSQL QUERY DISPLAY INFO
function view() {
    inquirer
    .prompt([
        {
            name: "choice",
            type: "list",
            message: "Which set records would you like to view?",
            choices:["Departments","Roles","Employees"]
        }
    ])
    .then(function(answer) {
        const choice=answer.choice;
        const sqlString="SELECT * FROM " + choice;
        
        connection.query(sqlString,{}, function(err,result) {
            if (err) throw err;
            console.table(result);
            start();
        }
        );
    });
}
// MYSQL QUERY ADD INFO 
function addTo() {
    inquirer
    .prompt([
        {
            name: "choice",
            type: "list",
            message: "Which set records would you like to add to?",
            choices:["Departments","Roles","Employees"]
        }
    ]).then(function(answer) {
        const choice=answer.choice;
        const sqlString="SELECT * FROM " + choice;
        connection.query(sqlString, function(err,result){
            console.log(result);
        })    
        
    });
}    
// MYSQL QUERY UPDATE EMPLOYEE ROLE
function update() {
    // GET ALL THE EMPLOYEES 
    connection.query("SELECT first_name, last_name, role_id FROM employees", function(err,result) {
        if (err) throw err;
        console.log(result);
        // inquirer
        // .prompt([
        //     {
        //         name: "employee",
        //         type: "rawlist",
        //         message: "Which employee requires a role_id update?",
        //         choices: result
        //     }
        // ])
        // .then(function(answer) {
        //     console.log(answer.employee)
        // })
    })}
    
    
    // const sqlString = "UPDATE employees SET role_id="newrole" WHERE "+id;
    // const query = connection.query(sqlString,
    //     function(err, res) {
    //         if (err) throw err;
    //         console.log(res.affectedRows + " products updated!\n");
    //         // Call deleteProduct AFTER the UPDATE completes
    //         deleteProduct();
    //     });
    // }
    
    
    
    
    
    
    