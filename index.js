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

// Function viewEmployees to view Employee table, with role information
function viewEmployees() {
    const sql = `SELECT * FROM employee`;
    db.query(sql, (err, rows) => {
        if (err) {
            throw err
        }
        console.table(rows);
        promptQuestions();
    });
};

// Function addEmployee for adding an employee
const addEmployee = async () => {
    let roles = await db.promise().query(`SELECT * FROM role`);
    let roleTitles = roles[0].map((role) => role.title);
    const roleMap = roles[0].reduce((map, currentItem) => {
        map[currentItem.title] = currentItem.id;
        return map;
    });
    // let manager = await db.promise().query(`SELECT manager_id FROM employee`);
    // let managerNames = manager[0].map((employee) => employee.manager_id);
    // const managerMap = manager[0].reduce((map, currentItem) => {
    //     map[currentItem.manager_id] = currentItem.manager_id;
    //     return map;
    // });
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
            name: 'employeeRole',
            message: "What is the employee's role? (Required)",
            choices: roleTitles,
            validate: employeeRoleInput => {
                if (employeeRoleInput) {
                    return true;
                } else {
                    console.log('Please select the role for the employee.')
                    return false;
                }
            }
        },
        { // ask for manager's id
            type: 'number',
            name: 'employeeManager',
            message: "What is the ID number for this employee's manager? (Required and only numbers are accepted.)",
            validate: employeeManagerInput => {
                if (employeeManagerInput) {
                    return true;
                } else {
                    console.log('Please select the manager ID number.')
                    return false;
                }
            }
        },
    ])
        // add new employee information into the employee table 
        .then((answers) => {
            
            const roleId = roleMap[answers.employeeRole];
            // const managerId = managerMap[answers.employeeManager];

            db.query(
                `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`,
                [answers.first_name, answers.last_name, roleId, answers.employeeManager],
                (err, data) => {
                    if (err) throw err;
                    console.log(`Employee added to database!`);
                    promptQuestions();
                }
            );
        });
};

// function to update employee
// TA Lexie Crawford (GitHub here: https://github.com/lexcraw4d) shared her code for an example for me to follow for async, await, and promise
// code is based off of Lexi's updateEmployeeRole code she shared with me (https://github.com/lexcraw4d)
const updateEmployee = async () => {
    let employee = await db.promise().query(`SELECT first_name FROM employee`);
    let employeeList = employee[0].map((employeeName) => employeeName.first_name);
    let roles = await db.promise().query(`SELECT * FROM role`);
    let roleTitles = roles[0].map((role) => role.title);
    const roleMap = roles[0].reduce((map, currentItem) => {
        map[currentItem.title] = currentItem.id;
        return map;
    });
    inquirer.prompt([
        // if 'Update an employee' role is selected, ask to select an employee, then ask to update role, then update database information
        { // ask user to select which employee they'd like to update
            type: 'list',
            name: 'employeeName',
            message: "Which employee's role do you want to update? Employee first names are listed. (Required)",
            choices: employeeList,
            validate: employeeNameInput => {
                if (employeeNameInput) {
                    return true;
                } else {
                    console.log('Please select an employee.');
                    return false;
                }
            },
        },
        { // ask user to update employee's role
            type: 'list',
            name: 'updateRole',
            message: "Which role do you want to assign to the selected employee? (Required)",
            choices: roleTitles,
            validate: updateRoleInput => {
                if (updateRoleInput) {
                    return true;
                } else {
                    console.log('Please select a role for the employee.')
                    return false;
                }
            }
        }
    ])
        // add updated information in the employee table 
        .then((answers) => {
    
            const roleId = roleMap[answers.updateRole];
           
            db.query(
                `UPDATE employee SET role_id = ? WHERE first_name = ?`,
                [roleId, answers.employeeName],
                (err, data) => {
                    if (err) throw err;
                    console.log(`Employee information updated in database!`);
                    promptQuestions()
                }
            );
        });
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
const addRole = async () => {
    let department = await db.promise().query(`SELECT * FROM department`);
    let roleDepartment = department[0].map((roleDepartment) => roleDepartment.name);
    const departmentMap = department[0].reduce((map, currentItem) => {
        map[currentItem.name] = currentItem.id;
        return map;
    });
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
            name: 'roleDepartment',
            message: "Which department does the role belong to? (Required)",
            choices: roleDepartment,
            validate: roleDepartmentInput => {
                if (roleDepartmentInput) {
                    return true;
                } else {
                    console.log('Please enter the department.')
                    return false;
                }
            }
        }
    ])
        // add new role title, salary, and department_id into the role table 
        .then((answers) => {

            const departmentId = departmentMap[answers.roleDepartment];

            db.query(
                `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`,
                [answers.role_name, answers.salary, departmentId],
                (err, data) => {
                    if (err) throw err;
                    console.log(`Role added to the database!`);
                    promptQuestions();
                }
            );
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
// function roleDepartment() {
//     const sql = `SELECT id FROM department`;
//     const choices = [];
//     db.query(sql, (err, data) => {
//             data.forEach((sql) => {
//                 choices.push(sql.id);
//             });
//     });
//     return choices;
// };

// // Function roleTitles to return role title chocies 
// function roleTitles() {
//     const sql = `SELECT id FROM role`;
//     const choices = [];
//     db.query(sql, (err, data) => {
//         data.forEach((sql) => {
//                 choices.push(sql.id);
//             });
//     });
//     return choices;
// };

// Function employeeNames to return employee names array 
// function employeeNames() {
//     const sql = `SELECT first_name FROM employee`;
//     const choices = [];
//     db.query(sql, (err, data) => {
//         //console.log(data[0].first_name);
//             data.forEach((name, index) => {
//                 choices.push(name.first_name);
//             });
//     });
//     return choices;
// };

// // Function managerNames to return manager names array choices
// function managerNames() {
//     const sql = `SELECT manager_id FROM employee`;
//     const choices = [];
//     db.query(sql, (err, data) => {
//             data.forEach((name, index) => {
//                 choices.push(name.manager_id);
//             });
//     });
//     return choices;
// };

// Initialize app
function init() {
    promptQuestions();
};

init();