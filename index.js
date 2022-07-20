// Node.js packages required for this application to run 
const inquirer = require('inquirer');
const fs = require('fs');
// require console.table Node.js package so MySQL tables appear in console
const cTable = require('console.table');

// Function to prompt array of questions 
const promptQuestions = () => {
    return inquirer.prompt([
        { // ask user to select what they'd like to do
            type: 'list',
            name: 'options',
            message: "Hello! What would you like to do? Please select an option from below. (Required)",
            choices: ['View all employees', 'Add an employee', 'Update an employee role', 'View all roles', 'Add a role','View all departments', 'Add a department', 'Quit'],
            validate: optionsInput => {
                if (optionsInput) {
                    return true;
                } else {
                    console.log('Please select one of the options.');
                    return false;
                }
            },
        },

        // If 'View all employees' is selected, return employee table
        //  return 
            // console.table([
                 // employee table
            // ]);

        // If 'Add an employee' is selected, ask for first name, last name, role, manager and add to database
        { // ask for employee first name
            type: 'input',
            name: 'first_name',
            message: "What is the employee's first name? (Required)",
            when: (input) => input.options === "Add an employee",
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
            when: (input) => input.options === "Add an employee",
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
            type: 'input',
            name: 'employee_role',
            message: "What is the employee's role? (Required)",
            when: (input) => input.options === "Add an employee",
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
            type: 'input',
            name: 'employee_manager',
            message: "Who is the employee's manager? (Required)",
            when: (input) => input.options === "Add an employee",
            validate: employee_managerInput => {
                if (employee_managerInput) {
                    return true;
                } else {
                    console.log('Please enter the name of the manager.')
                    return false;
                }
            }
        },
        // if 'Update an employee' role is selected, ask to select an employee, then ask to update role, then update database information
        { // ask user to select which employee they'd like to update
            type: 'list',
            name: 'options',
            message: "Which employee's role do you want to update? (Required)",
            when: (input) => input.options === "Update an employee role",
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
            when: (input) => input.options === "Update an employee role",
            choices: [],
            validate: update_roleInput => {
                if (update_roleInput) {
                    return true;
                } else {
                    console.log('Please select a role for the employee.')
                    return false;
                }
            }
        },
        // if 'View all roles' is selected, return roles table
        //  return 
            // console.table([
                 // roles table
            // ]);

        // if 'Add a role' is selected, ask for name, salary, and department for the role, then add role to database
        { // ask for name of role
            type: 'input',
            name: 'role_name',
            message: "What is the name of the role? (Required)",
            when: (input) => input.options === "Add a role",
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
            when: (input) => input.options === "Add a role",
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
            when: (input) => input.options === "Add a role",
            validate: role_departmentInput => {
                if (role_departmentInput) {
                    return true;
                } else {
                    console.log('Please enter the department.')
                    return false;
                }
            }
        },
        // if 'View all departments' is selected, return department table
           //  return 
            // console.table([
                 // department table
            // ]);

        // if 'Add a department' is selected, ask for name, then add department to database 
        { // ask for department name
            type: 'input',
            name: 'department_name',
            message: "What is the name of the department (Required)",
            when: (input) => input.options === "Add a department",
            validate: department_nameInput => {
                if (department_nameInput) {
                    return true;
                } else {
                    console.log('Please enter the name of the department.')
                    return false;
                }
            }
        },

        // if 'Quit' is selected, stop promptQuestions
    ])
};

// Initialize app
function init() {
    promptQuestions();
};

init();