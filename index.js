// Node.js packages required for this application to run 
const inquirer = require('inquirer');
const fs = require('fs');
// require console.table Node.js package so MySQL tables appear in console
const cTable = require('console.table');
const { allowedNodeEnvironmentFlags } = require('process');
// connect to database 
const db = require('./config/connection.js');

// Function to prompt array of questions 
const promptQuestions = () => {
    return inquirer.prompt([
        { // ask user to select what they'd like to do
            type: 'list',
            name: 'options',
            message: "Hello! What would you like to do? Please select an option from below. (Required)",
            choices: ['View all employees', 'Add an employee', 'Update an employee role', 'View all roles', 'Add a role', 'View all departments', 'Add a department', 'Quit'],
            validate: optionsInput => {
                if (optionsInput) {
                    return true;
                } else {
                    console.log('Please select one of the options.');
                    return false;
                }
            },
        }
    ])
        // If 'View all employees' is selected, return employee table
        .then(data => {
            if (data.options === 'View all employees') {
                return viewEmployees();
            } else if (data.options === 'Add an employee') {
                return addEmployee();
            } else if (data.options === 'Update an employee role') {
                return updateEmployee();
            } else if (data.options === 'View all roles') {
                return viewRoles();
            } else if (data.options === 'Add a role') {
                return addRole();
            } else if (data.options === 'View all departments') {
                return viewDepartments();
            } else if (data.options === 'Add a department') {
                return addDepartment();
            } else if (data.options === 'Quit') {
                return console.log('Goodbye');
            }
        })
};

// Function viewEmployees to view Employee table
function viewEmployees() {
    const sql = `SELECT * FROM employee`;
    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        console.table(rows);
        promptQuestions();
    });
};

// Function addEmployee for adding an employee
function addEmployee() {
    inquirer.prompt([
        // If 'Add an employee' is selected, ask for first name, last name, role, manager and add to database
        { // ask for employee first name
            type: 'input',
            name: 'first_name',
            message: "What is the employee's first name? (Required)",
            validate: first_nameInput => {
                if (first_nameInput) {
                    return true;
                } else {
                    console.log('Please enter the first name for the employee.')
                    return false;
                }
            }
        },
        { // ask for last name
            type: 'input',
            name: 'last_name',
            message: "What is the employee's last name? (Required)",
            validate: last_nameInput => {
                if (last_nameInput) {
                    return true;
                } else {
                    console.log('Please enter the last name for the employee.')
                    return false;
                }
            }
        },
        { // ask for employee role
            type: 'list',
            name: 'employee_role',
            message: "What is the employee's role? (Required)",
            choices: roleTitles(),
            validate: employee_roleInput => {
                if (employee_roleInput) {
                    return true;
                } else {
                    console.log('Please enter the role for the employee.')
                    return false;
                }
            }
        },
        { // ask for manager's name
            type: 'list',
            name: 'employee_manager',
            message: "Who is the employee's manager? (Required)",
            choices: managerNames(),
            validate: employee_managerInput => {
                if (employee_managerInput) {
                    return true;
                } else {
                    console.log('Please enter the name of the manager.')
                    return false;
                }
            }
        },
    ])
      // add new employee information into the employee table 
      .then(function (answers) {
        const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
        const params = [answes.first_name, answers.last_name, answer.role_id, answers.manager_id];

        db.query(sql, params, (err) => {
            if (err) {
                console.log(err)
            }
            console.log(`${params} added to database!`)
        });
        // return to options by calling promptQuestions
        (promptQuestions());
    })
};

// function to update employee
function updateEmployee() {
    inquirer.prompt([
        // if 'Update an employee' role is selected, ask to select an employee, then ask to update role, then update database information
        { // ask user to select which employee they'd like to update
            type: 'list',
            name: 'options',
            message: "Which employee's role do you want to update? (Required)",
            choices: employeeNames(),
            validate: optionsInput => {
                if (optionsInput) {
                    return true;
                } else {
                    console.log('Please select an employee.');
                    return false;
                }
            },
        },
        { // ask user to update employee's role
            type: 'list',
            name: 'update_role',
            message: "Which role do you want to assign to the selected employee? (Required)",
            choices: roleTitles(),
            validate: update_roleInput => {
                if (update_roleInput) {
                    return true;
                } else {
                    console.log('Please select a role for the employee.')
                    return false;
                }
            }
        }
    ])
};

// Function viewRoles to view Role table
function viewRoles() {
    const sql = `SELECT * FROM role`;
    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        console.table(rows);
        promptQuestions();
    });
};

// Function to add a role
function addRole() {
    inquirer.prompt([
        // if 'Add a role' is selected, ask for name, salary, and department for the role, then add role to database
        { // ask for name of role
            type: 'input',
            name: 'role_name',
            message: "What is the name of the role? (Required)",
            validate: role_nameInput => {
                if (role_nameInput) {
                    return true;
                } else {
                    console.log('Please enter the name of the role.')
                    return false;
                }
            }
        },
        { // ask for salary of role
            type: 'input',
            name: 'salary',
            message: "What is the salary of the role? (Required)",
            validate: salaryInput => {
                if (salaryInput) {
                    return true;
                } else {
                    console.log('Please enter the salary of the role.')
                    return false;
                }
            }
        },
        { // ask for department of role
            type: 'list',
            name: 'role_department',
            message: "Which department does the role belong to? (Required)",
            choices: roleDepartment(),
            validate: role_departmentInput => {
                if (role_departmentInput) {
                    return true;
                } else {
                    console.log('Please enter the department.')
                    return false;
                }
            }
        }
    ])
        // add new role title, salary, and department_id into the Roletable 
        .then(function (answers) {
            const sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
            const params = [answers.role_title, answers.role_salary, answers.role_department_id];

            db.query(sql, params, (err) => {
                if (err) {
                    console.log(err)
                }
                console.log(`${params} added to database!`)
            });
            // return to options by calling promptQuestions
            (promptQuestions());
        })
};

// Function viewDepartments to view Department table
function viewDepartments() {
    const sql = `SELECT * FROM department`;
    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        console.table(rows);
        promptQuestions();
    });
};

// function to add a department 
function addDepartment() {
    inquirer.prompt([
        // if 'Add a department' is selected, ask for name, then add department to database 
        { // ask for department name
            type: 'input',
            name: 'department_name',
            message: "What is the name of the department (Required)",
            validate: department_nameInput => {
                if (department_nameInput) {
                    return true;
                } else {
                    console.log('Please enter the name of the department.')
                    return false;
                }
            }
        },
    ])
        // add new department name into the Department table 
        .then(function (answers) {
            const sql = `INSERT INTO department (name) VALUES (?)`;
            const params = [answers.department_name];

            db.query(sql, params, (err) => {
                if (err) {
                    console.log(err)
                }
                console.log(`${params} added to database!`)
            });
            // return to options by calling promptQuestions
            (promptQuestions());
        })
};

// Function roleDepartment to return department name choices
// Used this website to better understand the forEach array push : https://tutorial.eyehunts.com/js/foreach-push-to-array-javascript-example-code/ 
function roleDepartment() {
    const sql = `SELECT name FROM department`;
    const choices = [];
    db.query(sql, (err, data) => {
            data.forEach((sql) => {
                choices.push(sql.name);
            });
    });
    return choices;
};

// Function roleTitles to return role title chocies 
function roleTitles() {
    const sql = `SELECT title FROM role`;
    const choices = [];
    db.query(sql, (err, data) => {
            data.forEach((sql) => {
                choices.push(sql.title);
            });
    });
    return choices;
};

// Function employeeNames to return employee names array 
function employeeNames() {
    const sql = `SELECT first_name FROM employee`;
    const choices = [];
    db.query(sql, (err, data) => {
            data.forEach((sql) => {
                choices.push(sql.first_name);
            });
    });
    return choices;
};

// Function managerNames to return manger names array choices
function managerNames() {
    const sql = `SELECT manager_id FROM employee`;
    const choices = [];
    db.query(sql, (err, data) => {
            data.forEach((sql) => {
                choices.push(sql.manager_id);
            });
    });
    return choices;
};

// Initialize app
function init() {
    promptQuestions();
};

init();