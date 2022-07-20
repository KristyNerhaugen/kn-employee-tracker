// Node.js packages required for this application to run 
const inquirer = require('inquirer');
const fs = require('fs');
// require console.table Node.js package so MySQL tables appear in console
const cTable = require('console.table');
const { allowedNodeEnvironmentFlags } = require('process');
// connect to database 
const db = require('/config/connection.js');

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
    });
};

// Function addEmployee for adding an employee
function addEmployee() {
    inquirer.prompt([
        // How do we pull role choices from role database? 
        // const sql = `SELECT role.id, role.title, role.salary, role.department
        //             FROM role`;
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
            choices: [],
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
            choices: [],
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
};

// function to update employee
function updateEmployee() {
    inquirer.prompt([
        // if 'Update an employee' role is selected, ask to select an employee, then ask to update role, then update database information
        { // ask user to select which employee they'd like to update
            type: 'list',
            name: 'options',
            message: "Which employee's role do you want to update? (Required)",
            choices: [],
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
            choices: [],
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
            type: 'input',
            name: 'role_department',
            message: "Which department does the role belong to? (Required)",
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
};

// Initialize app
function init() {
    promptQuestions();
};

init();