import mysql from 'mysql2/promise'
import { inquire } from '../index.js'
import inquirer from 'inquirer'
const connection =  await mysql.createConnection({ 
    host: 'localhost', 
    port: 3306,
    user: 'root',
    password:'rootroot', 
    database: 'company_db', 
});

const getInfo = 'SELECT employee.id, employee.first_name, employee.last_name, role.role, department.department, role.salary, CONCAT(themanager.first_name, " " ,themanager.last_name)';
const joinManager = 'AS manager FROM employee LEFT JOIN role AS role ON employee.role_id=role.id LEFT JOIN department AS department ON role.department_id=department.id LEFT JOIN employee AS themanager ON themanager.id=employee.manager_id';
const orderTable = 'ORDER BY department.id;'




////-----------------------------------------------------------------------------------

export async function addDepartment() {
    let newDepartment = await inquirer.prompt([
        {
            type: 'input',
            name: 'department',
            message: 'enter department name:',
        },
    ]);
    
    await connection.query('INSERT INTO department SET ?', [newDepartment]);
    inquire();
}

////-----------------------------------------------------------------------------------
export async function addRole() {
    let newRole = await inquirer.prompt([
        {
            type: 'input',
            name: 'role',
            message: "enter role:",
        },
        {
            
            type: 'input',
            name: 'salary',
            message: "new role salary:",
        },
        {
            type: 'input',
            name: 'department_id',
            message: 'enter dept. ID'
            
        }
    ]);
    
    await connection.query('INSERT INTO role SET ?', [newRole]);
    inquire();
}

////-----------------------------------------------------------------------------------

export async function addEmployee() {
    let [rows] = await connection.execute(`SELECT * From employee`);
    console.table(rows);
    
    let [roles] = await connection.execute(`SELECT * From role`);
    
    let newEmployee = await inquirer.prompt([
        {
            type: 'list',
            name: 'role_id',
            message: 'Employee role?',
            choices: roles.map(role => ({ value: role.id, name: role.title }))
        },
        {
            type: 'input',
            name: 'first_name',
            message: " employee first name:",
        },
        {
            type: 'input',
            name: 'last_name',
            message: " employee last name:",
        },
        {
            type: 'list',
            name: 'manager_id',
            message: 'corresponding manager:',
            choices: rows.map(emp => ({ value: emp.id, name: `${emp.first_name} ${emp.last_name}` }))
            
        }
    ]);
    
    await connection.query('INSERT INTO employee SET ?', newEmployee);
    inquire();
}

////-----------------------------------------------------------------------------------


export async function update() {
    let [employees] =  await connection.execute(`SELECT first_name AS name , id AS value  FROM employee;`);
    let [roles] =  await connection.execute(`SELECT  id AS value, title AS name  FROM role;`);
    
    let update = await inquirer.prompt([
        {
            type: 'list',
            name: 'id',
            message: 'select employee:',
         choices: employees
        },
        {
            type: 'list',
            name: 'manager',
            message: 'select manager:',
            choices: employees
        },
        {
            type: 'list',
            name: 'role',
            message: 'set new role:',
            choices: roles
        }
    ]);
    
    await connection.query('UPDATE employee SET ? WHERE ?', [
        {manager_id:update.manager},
        {id:update.id}]);
        
        console.log('update successful');
        inquire();
    }
    
    ////-----------------------------------------------------------------------------------
    
    export async function viewAll() {
        let [entries] =  await connection.execute(`${getInfo} ${joinManager} ${orderTable}`);
        console.table(entries);
        inquire();
    }
    
    ////-----------------------------------------------------------------------------------
    
    export async function view(query) {
        let [entries] =  await connection.execute(`SELECT * FROM ${query};`);
    
        console.table(entries);
        inquire();
      }
    
    