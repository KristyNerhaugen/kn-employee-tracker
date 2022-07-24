# Challenge Twelve: KN Employee Tracker ![MIT badge](https://img.shields.io/badge/License-MIT-yellow.svg)

## Description
### For this challenge, I created an employee tracker application. KN Employee Tracker prompts the user to select from a variety of choices: view all departments, view all roles, view all employees, add a department, add a role, add an employee, update an employee role, or quit. This application allows a business owner to view and manage departments, roles, and employees so that they can be organized and plan. There is no link to a deployed application because this application runs through the command line.

## Table of Contents 
### [Installation](#installation)
### [Usage](#usage)
### [Credits](#credits) 
### [License](#license)

## Installation
### Access the code via GitHub. Fork, clone, or download the code. This application only works using node.js and MySQL2 and requires the installation of the Inquirer package, which can be found here: [Inquirer](https://www.npmjs.com/package/inquirer) and the installation of the console.table package which can be found here: [console.table](https://www.npmjs.com/package/console.table). Node MySQL2 must also be installed: [Node MySQL2](https://www.npmjs.com/package/mysql2).

## Usage
### This application can be used by a business owner to view and manage departments, roles, and employees so that they can be organized and plan.

### This video shows the functionality of the application:
### [Video Tutorial](https://drive.google.com/file/d/1524oUHDokLnFPc2mPGK13UBkdZGPdeZ3/view?usp=sharing)

## Credits 
### I used what I learned in the BootCamp Spot modules and BootCamp classes to create this application. I relied heavily on the content I learned in Modules 11, 12, and 13. I also used the Inquirer, console.table, and Node MySQL2 packages: [Inquirer](https://www.npmjs.com/package/inquirer), [console.table](https://www.npmjs.com/package/console.table), and [Node MySQ2L](https://www.npmjs.com/package/mysql2). I referred to the inquirer documentation frequently: [Inquirer Documentation](https://www.npmjs.com/package/inquirer#methods). I used this website, https://dev.mysql.com/doc/refman/8.0/en/fixed-point-types.html, to figure out how to set up a DECIMAL with MySQL. I referred to the console.table documentation, https://www.npmjs.com/package/console.table/v/0.10.0, to understand how to show tables in the console. My BootCamp tutor, Rebecca Burke, helped me get the database connected with Inquirer when I was getting errors. This tutorial helped me figure out how to add data gathered from Inquirer prompts into the database tables: https://YouTube.com/watch?v=gZugKSoAyoY. I frequently referred to the MySQL documentation: https://dev.mysql.com/doc/refman/8.0/en/select.html. To better understand working with arrays and the map() method, I used these site: https://tutorial.eyehunts.com/js/foreach-push-to-array-javascript-example-code/, https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map, and https://debbie.codes/blog/js-array-map-method/. My BootCamp TA Lexie helped me a lot when my code was only pulling some array choices for certain questions and only generating some data into the databases. She helped me restructure my code using promise, async, and await. She shared some of her code with me so I could model my code off of it. That is credited in the index.js file, and Lexi's GitHub account can be found here: https://github.com/lexcraw4d. I also used this source to try to figure out how to pull information from multiple tables for viewEmployees to display more information (this feature still doesn't work): https://www.geeksforgeeks.org/sql-select-from-multiple-tables-with-ms-sql-server/. 


## License
### The MIT License 
#### Copyright 2022 Kristy Nerhaugen 
#### Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions: 
#### The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. 
#### THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. 