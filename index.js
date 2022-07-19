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
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role'],
            validate: optionsInput => {
                if (optionsInput) {
                    return true;
                } else {
                    console.log('Please select one of the options.');
                    return false;
                }
            },
        },

    ])
};

// Initialize app
function init() {
    promptQuestions();
};

init();