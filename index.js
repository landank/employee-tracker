const { prompt, default: inquirer } = require('inquirer');
const db = require('./db/connection');
require('console.table');

const viewEmployees = async () => {
    const [employeeData] = await db.query(`SELECT * FROM employee`);
    console.table(employeeData);
    mainMenu();
};

const viewDepartments = async () => {
    const [departmentData] = await db.query(`SELECT * FROM department`);
    console.table(departmentData);
    mainMenu();
};

const viewRoles = async () => {
    const [roleData] = await db.query('SELECT * FROM role');
    console.table(roleData);
    mainMenu();
};

const addEmployee = async () => {
    const [roles] = await db.query(`SELECT * FROM role`);
    const roleList = roles.map((eachRole)=> {
      return {name: eachRole.title, value: eachRole.id};
    });
    const [employee] = await db.query(`SELECT * FROM employee`);
    const employeeList = employee.map((eachEmployee)=> {
      return {name: eachEmployee.first_name + " " + eachEmployee.last_name, value: eachEmployee.id};
    });
    await prompt([
        {
            type: 'input',
            message: "What is the employee's first name?",
            name: 'first_name'
        },
        {
            type: 'input',
            message: "What is the employee's last name?",
            name: 'last_name'
        },
        {
            type: 'rawlist',
            message: "What is their role?",
            name: 'role_id',
            choices: roleList,
        },
        {
          type: "list",
          name: "manager_id",
          message: "Who is their manager?",
          choices: employeeList,
        }
    ]).then(function (answers) {
        db.query(`INSERT INTO employee SET ?` , {
            first_name: answers.first_name,
            last_name: answers.last_name,
            role_id: answers.role_id,
            manager_id: answers.manager_id
        });
        console.log('--- Employee Added ---');
        mainMenu();
    });
};

const addDepartment = async () => {
    await prompt([
        {
            type: 'input',
            message: "What is the name of the department?",
            name: 'department_name'
        },
    ]).then(function (answers) {
        db.query(`INSERT INTO department SET ?` , {
            department_name: answers.department_name
        });
        console.log('--- Department Added ---');
        mainMenu();
    });
};

const addRole = async () => {
    const [department] = await db.query(`SELECT * FROM department`);
    const departmentList = department.map((eachDepartment)=> {
      return {department_name: eachDepartment.department_name, value: eachDepartment.id};
    });
    await prompt([
      {
        type: 'input',
        message: 'What is the title of the role?',
        name: 'role',
      },
      {
        type: 'input',
        message: 'What is the salary of the role?',
        name: 'salary',
      },
      {
        type: 'list',
        message: 'What department will they be in?',
        name: 'role_department',
        choices: departmentList,
      }
    ]).then(function (answers) {
        db.query(`INSERT INTO role SET ?`, {
            title: answers.role,
            salary: answers.salary,
            department_id: answers.role_department
        });
        console.log('--- Role Added ---');
        mainMenu();
    });
};

const updateEmployee = async () => {
    const [roles] = await db.query(`SELECT * FROM role`);
    const roleList = roles.map((eachRole)=> {
        return {name: eachRole.title, value: eachRole.id};
    });
    const [employees] = await db.query(`SELECT * FROM employee`);
    const employeeList = employees.map((eachEmployee)=> {
        return {name: eachEmployee.first_name + " " + eachEmployee.last_name, value: eachEmployee.id};
    });
    await prompt([
        {
            type: 'list',
            message: "Who would you like to update?",
            name: 'employee_name',
            choices: employeeList,
        },
        {
            type: 'list',
            message: "What role would you like to update them to?",
            name: 'employee_role',
            choices: roleList,
        }
    ]).then(function (answers){
        db.query(`UPDATE employee SET role_id = ? WHERE id = ?`, [
            answers.employee_role,
            answers.employee_name,
        ]);
        console.log ('--- Employee Updated ---');
        mainMenu();
    });
};

const mainMenu = async () => {
    try {
        const { choice } = await prompt([
            {
                type: 'list',
                name: 'choice',
                message: 'Select an Option to Proceed',
                choices: [
                    {
                        name: 'View All Employees',
                        value: 'VIEW_EMPLOYEES'
                    },
                    {
                        name: 'Add a New Employee',
                        value: 'ADD_EMPLOYEE'
                    },
                    {
                        name: 'Update An Employees Role',
                        value: 'UPDATE_EMPLOYEE'
                    },
                    {
                        name: 'View All Listed Departments',
                        value: 'VIEW_DEPARTMENTS'
                    },
                    {
                        name: 'View All Listed Roles',
                        value: 'VIEW_ROLES'
                    },
                    {
                        name: 'Add a  New Department',
                        value: 'ADD_DEPARTMENT'
                    },
                    {
                        name: 'Add a New Role',
                        value: 'ADD_ROLE'
                    },
                    {
                        name: 'Exit Menu',
                        value: 'EXIT'
                    }
                ]
            }
        ]);

        switch (choice) {
            case 'VIEW_EMPLOYEES':
                viewEmployees();
                break;
            case 'VIEW_DEPARTMENTS':
                viewDepartments();
                break;
            case 'VIEW_ROLES':
                viewRoles();
                break;
            case "ADD_EMPLOYEE":
                addEmployee();
                break;
            case "UPDATE_EMPLOYEE":
                updateEmployee();
                break;
            case "ADD_DEPARTMENT":
                addDepartment();
                break;
            case "ADD_ROLE":
                addRole();
            case 'EXIT':
                process.exit();
                break;
            default:
                process.exit();
        };
    } catch (err) {
        console.log(err);
    }
};

mainMenu();
