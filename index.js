// Node packages required for this application to run 
const inquirer = require('inquirer');
const fs = require('fs');

// Function to prompt array of questions 

const promptQuestions = () => {
    return inquirer.prompt([
        { // ask user to select what they'd like to do
            type: 'list',
            name: 'options',
            message: 'Hello! What would you like to do? Please select an option from below. (Required)',
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
        // If 'Add an employee' is slected, ask for first name, last name, role, manager and add to database
        // if 'Update an employee' role is selected, ask to select an employee, then ask to update role, then update database information
        // if 'View all roles' is selected, return roles table
        // if 'Add a role' is selected, ask for name, salary, and department for the role, then add role to database
        // if 'View all departments' is selected, return department table
        // if 'Add a department' is selected, ask for name, then add department to database 
        // if 'Quit' is selected, stop promptQuestions
    ])
};

// Initialize app
function init() {
    promptQuestions();
};

init();