import { test } from '@playwright/test';
import { initEmp } from '../object/employee';
import { login } from '../pages/login';
import { home } from '../pages/home';
import { empHub } from '../pages/empHub';

test('Add new employee', async({ page }) => {
    
    const emp1 = initEmp();
    //Login 
    const tp = new login(page);
    await tp.goto('https://sandbox-app.brighthr.com');
    await tp.fillCred('tltestingacc+bhr@gmail.com', 'Zaq12wsxcde3');
    await tp.clickLogin();

    //Nav to employee hub
    const hp = new home(page);
    await hp.goEmpHub();

    //Add new employee 1
    const emp = new empHub(page);
    await emp.addEmployer();
    await emp.saveNewEmp(emp1);
    //Add new employee 2
    const emp2 = initEmp();
    await emp.addEmployer();
    await emp.saveNewEmp(emp2);
    //Nav to employee tab again
    await hp.goEmpHub();

    //Evaluate new employer at employee
    await emp.evalNewEmp(emp1);
    await emp.evalNewEmp(emp2);
})