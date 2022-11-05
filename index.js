import mysql from 'mysql2/promise'
import inquirer from 'inquirer'



const getInfo = 'SELECT employee.id, employee.first_name, employee.last_name, role.role, department.department, role.salary, CONCAT(themanager.first_name, " " ,themanager.last_name)';
const joinManager = 'AS manager FROM employee LEFT JOIN role AS role ON employee.role_id=role.id LEFT JOIN department AS department ON role.department_id=department.id LEFT JOIN employee AS themanager ON themanager.id=employee.manager_id';
const orderTable = 'ORDER BY department.id;'



const connection =  await mysql.createConnection({ 
    host: 'localhost', 
    port: 3306,
    user: 'root',
    password:'rootroot', 
    database: 'company_db', 
  });

inquire();


 async function inquire() {
  const commands = await inquirer.prompt([{
    type: 'list',
    name: 'menu',
    message: "What would you like to do ",
    choices: [
                  'view departments',
                  'view roles',
                  'view employees',
                  'add department',
                  'add role',
                  'add employee',
                  'update role ',
                  'exit'
            ]
  }]);

commands.menu == "view departments" ? view('department') :
commands.menu == "view roles"       ? view('role') :
commands.menu == "view employees"   ? viewEmployees() :
commands.menu == "add department"   ? addADepartment() :
commands.menu == "add employee"     ? addAEmployee() :
commands.menu == "add role"         ? addARole() :
commands.menu == "update role "     ? updateAEmployee() : console.log('err');
};



   async function view(query) {
    let [entries] =  await connection.execute(`SELECT * FROM ${query};`);
    console.log(`${query}s`);

    console.table(entries);
    inquire();
  }


   async function viewEmployees() {
    let [entries] =  await connection.execute(`${getInfo} ${joinManager} ${orderTable}`);
    console.log(entries)
    console.table(entries);
    inquire();
  }


   async function addADepartment() {
    let newDepartment = await inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'enter new department',
      },
    ]);

   await connection.query('INSERT INTO department SET ?', [newDepartment]);
    inquire();
  }



   async function addARole() {
    let newRole = await inquirer.prompt([
      {
        type: 'input',
        name: 'title',
        message: "enter new role",
      },
      {
  
        type: 'input',
        name: 'salary',
        message: "enter salary amount",
      },
      {
        type: 'input',
        name: 'department_id',
        message: 'enter dept. ID'
        
      }
    ]);
    console.log(newRole);

     await connection.query('INSERT INTO role SET ?', [newRole]);
    inquire();
  }



   async function addAEmployee() {
    let [rows] = await connection.execute(`SELECT * From employee`);
    console.table(rows);

    let [roles] = await connection.execute(`SELECT * From role`);
    console.log(roles);

    let newEmployee = await inquirer.prompt([
      {
        type: 'list',
        name: 'role_id',
        message: 'what role will the employee have? ',
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
    console.log(newEmployee);

     await connection.query('INSERT INTO employee SET ?', newEmployee);
    inquire();
  }



   async function updateAEmployee() {
    let [employees] =  await connection.execute(`SELECT first_name AS name , id AS value  FROM employee;`);
    let [roles] =  await connection.execute(`SELECT  id AS value, title AS name  FROM role;`);
    
    let update = await inquirer.prompt([
      {
        type: 'list',
        name: 'id',
        message: 'employee to update:',
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

     console.log(update);
    inquire();
  }
  

