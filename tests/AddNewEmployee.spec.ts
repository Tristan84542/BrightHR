import {test, expect} from '@playwright/test';
import { Employee, initEmp } from '../object/employee';
import { login } from '../pages/login';
import { home } from '../pages/home';
import { empHub } from '../pages/empHub';
import { empProfile } from '../pages/empProfile';

test('Add new employee', async({ page }) => {
    
    const newEmp = initEmp();
    //console.log(newEmp);
    //Login 
    const tp = new login(page);
    await tp.goto('https://sandbox-app.brighthr.com');
    await tp.fillCred('tltestingacc+bhr@gmail.com', 'Zaq12wsxcde3');
    await tp.clickLogin();

    //Nav to employee hub
    const hp = new home(page);
    await hp.goEmpHub();

    //Add new employee
    const emp = new empHub(page);
    await emp.addEmployer();
    await emp.saveNewEmp(newEmp);
    //Evaluate new employer at hub page
    await emp.evalNewEmp(newEmp);
    //Open new employer profile
    await emp.openNewEmpPro(newEmp);
    //Evaluate new employer at details
    const profile = new empProfile(page);
    await profile.verifyEmployee(newEmp);
})