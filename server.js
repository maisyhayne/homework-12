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
        connection.query("SELECT * FROM ",answer.choice, function(err,result) {
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
    ])
    .then(function(answer) {
        const choice=answer.choice;
        switch (choice) {
            case "Departments":
            addDepartment();
            break;
            
            case "Roles":
            addRole();
            break;
            
            case "Employees":
            addEmployee();
            break;
            
            default:
            break;
        }
        
    });
}    

// MYSQL QUERY UPDATE EMPLOYEE ROLE
function update() {
    // GET ALL THE EMPLOYEES 
    connection.query("SELECT first, last, role_id FROM employees", function(err,result) {
        if (err) throw err;
        resultMapped=result.map();
        console.log(resultMapped);
        // inquirer
        // .prompt([
        //     {
        //         name: "employee",
        //         type: "rawlist",
        //         message: "Which employee requires a role_id update?",
        //         choices: parsed.name
        //     }
        // ])
        // .then(function(answer) {
        //     console.log(result);
        // })
        
        // const sqlString = "UPDATE employees SET role_id="newrole" WHERE "+id;
        // const query = connection.query(sqlString,
        //     function(err, res) {
        //         if (err) throw err;
        //         console.log(res.affectedRows + " products updated!\n");
        //         // Call deleteProduct AFTER the UPDATE completes
        //         deleteProduct();
        //     });
        // }
    })
}





// ADD A DEPARTMENT DURING addTo()
function addDepartment(){
    inquirer
    .prompt({
        name: "department",
        type: "input",
        message: "Enter new department name"
    })
    .then(function(answer){
        connection.query("INSERT INTO departments SET ?",
        {
            name: answer.department
        },
        function(err){if(err) throw err;})
        console.log(answer.department+" successfully added to departments"); 
    }
    )
}

// ADD A ROLE DURING addTo()
function addRole(){
    inquirer
    .prompt({
        name: "title",
        type: "input",
        message: "Enter new title"
    },
    {
        name: "salary",
        type: "input",
        message: "Enter the salary"
    })
    .then(function(answer){
        connection.query("INSERT INTO roles SET ?",
        {name: answer.department},
        function(err){if(err) throw err;})
        console.log(answer.department+" successfully added to departments");
        start(); 
    })
}


// ADD AN EMPLOYEE DURING addTo()
function addEmployee(){
    // GET ALL ROLES TO GET POSSIBLE IDS
    const roles=[]
    connection.query("SELECT * FROM roles", 
    function(err,result) {
        if (err) throw err;
        roles=result;
    })
    inquirer
    .prompt(
        {
            name: "first",
            type: "input",
            message: "Enter their first name"
        },
        {
            name: "last",
            type: "input",
            message: "Enter their last name"
        },
        {
            name: "role",
            type: "list",
            message: "Enter new title",
            choices: roles
        }
        
        )
        .then(function(answer){
            connection.query("INSERT INTO employees SET ?",
                {
                    first: answer.first,
                    last: answer.last,
                    role 
                },
                function(err){if(err) throw err;
                })
                console.log(answer.department+" successfully added to departments");
                start(); 
            })
        }
        
    }
    