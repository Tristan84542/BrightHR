import {test, expect} from '@playwright/test';
import { employee, initEmp } from '../object/employee';
import { login } from '../pages/login';
import { home } from '../pages/home';
import { empHub } from '../pages/empHub';
import { empProfile } from '../pages/empProfile';

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

    //Add new employee
    const empHub1 = new empHub(page);
    await empHub1.addEmployer();
    emp1.uid = await empHub1.saveNewEmp(emp1);
    //Evaluate new employer at hub page
    const emp2 = initEmp();
    await empHub1.addEmployer();
    emp2.uid = await empHub1.saveNewEmp(emp2);
    //Re-access employee tab page
    await hp.goEmpHub();
    //Verify both new employee exist at employee page
    await empHub1.evalEmp(emp1);
    await empHub1.evalEmp(emp2)
    //Open new employee 1 profile
    await empHub1.openNewEmpPro(emp1);
    //Verify new employee 1 details
    const profile = new empProfile(page);
    await profile.verifyEmployee(emp1);
    //Re-access employee tab page
    await hp.goEmpHub();
    //Open new employee 2 profile
    const empHub2 = new empHub(page);
    await empHub2.openNewEmpPro(emp2);
    const profile2 = new empProfile(page);
    await profile2.verifyEmployee(emp2);
})