
import inquirer from 'inquirer'
import { viewAll, addDepartment, addRole, addEmployee, view, update } from './assets/data.mjs'







inquire();


export async function inquire() {
  const commands = await inquirer.prompt([{
    type: 'list',
    name: 'menu',
    message: "Select from list:",
    choices: [
                  'view departments',
                  'view roles',
                  'view employees',
                  new inquirer.Separator('~~~~~~~~~~~~~~~~~~~~~~~~~~~'),
                  'add department',
                  'add role',
                  'add employee',
                  'update role ',
                  'exit'
            ]
  }]);

commands.menu == "view departments" ? view('department') :
commands.menu == "view roles"       ? view('role') :
commands.menu == "view employees"   ? viewAll() :
commands.menu == "add department"   ? addDepartment() :
commands.menu == "add employee"     ? addEmployee() :
commands.menu == "add role"         ? addRole() :
commands.menu == "update role "     ? update() : process.exit();
};



 


