import mysql from 'mysql2'
import inquirer from 'inquirer'



const queryString = 'SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, CONCAT(newemp.first_name, " " ,newemp.last_name)';
const queryString2 = 'AS manangername FROM employee LEFT JOIN role ON employee.role_id=role.id LEFT JOIN department ON role.department_id=department.id LEFT JOIN employee AS newemp ON newemp.id=employee.manager_id;`)';



const connection = mysql.createConnection({ host: 'localhost', user: 'root', password:'rootroot', database: 'corporate_db', });

inquire();


async function inquire() {
  const commands = await inquirer.prompt([{
    type: 'list',
    name: 'menu',
    message: "What would you like to do ",
    choices: [
                  'view all departments',
                  'view all roles',
                  'view all employees',
                  'add a department',
                  'add a role',
                  'add an employee',
                  'update an employee role ',
                  'exit'
            ]
  }]);

commands.menu == "view departments" ? view('department') :
commands.menu == "view roles"       ? view('role') :
commands.menu == "view employees"   ? viewEmployees() :
commands.menu == "add department"   ? addADepartment() :
commands.menu == "add employee"     ? addAEmployee() :
commands.menu == "add role"         ? addARole() :
commands.menu == "update role "     ? updateAEmployee() : process.exit();
};



  async function view(query) {
    let [entries] =  connection.execute(`SELECT * FROM ${query};`);
    console.log(`${query}s`);

    console.table(entries);
    inquire();
  }


  async function viewEmployees() {
    let [entries] =  connection.execute(`${queryString} ${queryString2}`);

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

   connection.query('INSERT INTO department SET ?', [newDepartment]);
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

     connection.query('INSERT INTO role SET ?', [newRole]);
    inquire();
  }



  async function addAEmployee() {
    let [rows] = connection.execute(`SELECT * From employee`);
    console.table(rows);

    let [roles] = connection.execute(`SELECT * From role`);
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
        message: " employee first name ?",
      },
      {
        type: 'input',
        name: 'last_name',
        message: " employee last name ?",
      },
      {
        type: 'list',
        name: 'manager_id',
        message: 'who is the manager? ',
        choices: rows.map(emp => ({ value: emp.id, name: `${emp.first_name} ${emp.last_name}` }))
  
      }
    ]);
    console.log(newEmployee);

     connection.query('INSERT INTO employee SET ?', newEmployee);
    inquire();
  }



  async function updateAEmployee() {
    let [employees] =  connection.execute(`SELECT first_name AS name , id AS value  FROM employee;`);
    let [roles] =  connection.execute(`SELECT  id AS value, title AS name  FROM role;`);
    
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

     connection.query('UPDATE employee SET ? WHERE ?', [
        {manager_id:update.manager},
        {id:update.id}]);

     console.log(update);
    inquire();
  }
  

