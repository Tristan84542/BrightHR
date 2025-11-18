import {Page, expect} from '@playwright/test';
import { Employee } from '../object/employee';

export let startYear = 0;
let newEmpId: string;
export class empHub{
    
    constructor(private page: Page){}

    async addEmployer(){
        await this.page.getByRole('button', {name : 'Add employee'}).click();
    }

    async saveNewEmp(newEmployee: Employee){
        const curYear = new Date().getFullYear();
        const curMonth = new Date().toLocaleString('en-US', {month: 'long'});
        await this.page.locator('#firstName').fill(newEmployee.firstName);
        await this.page.locator('#lastName').fill(newEmployee.lastName);
        await this.page.locator('#email').fill(newEmployee.email);
        await this.page.locator('#phoneNumber').fill(newEmployee.phone);
        //Always set the start date = next year Jan 1
        await this.page.getByTestId('input-selector').click();
        let daypicker = this.page.getByTestId('daypicker-panel');
        //Change year to next year
        await daypicker.getByRole('button', {name : curYear.toString()}).click();
        let yearpicker = this.page.getByTestId('daypicker-panel');
        await yearpicker.getByRole('button', {name: newEmployee.startYear.toString()}).click();
        //Change month to Jan
        await daypicker.getByRole('button', {name: curMonth}).click();
        let monthpicker = this.page.getByTestId('daypicker-panel');
        await monthpicker.getByRole('button', {name: 'Jan'}).click();
        let datepicker = this.page.getByTestId('daypicker-panel');
        let splitDate = newEmployee.startDate.split(" ");
        let labelDate = splitDate[0] + " " + splitDate[2] + " " + splitDate[1] + " " + splitDate[3];
        //console.log(labelDate);
        await datepicker.getByLabel(labelDate).click();
        //Date should be set
        await expect(this.page.locator('#startDate')).toHaveText(newEmployee.startDate);
        //Set job title
        await this.page.locator('#jobTitle').fill(newEmployee.jobTitle);
        //Save button should be enabled;
        let saveBtn = this.page.getByRole('button', {name: 'Save new employee'});
        await expect(saveBtn).toBeEnabled();
        //This should make sure employee is created before closing popup.
        const resPromise = this.page.waitForResponse(res => 
            res.url() === 'https://sandbox-api.brighthr.com/v1/employee' 
            && res.status() === 201 && res.request().method() === 'POST');
        await saveBtn.click();
        const response = await resPromise;
        const responseJson = await response.json();
        newEmpId = responseJson.id;
        //console.log(newEmpId);
        //Close popup
        await this.page.getByTestId('background').getByLabel('Close modal').click();
    }

    //Check new user full name is visible on new employee hub
    async evalNewEmp(newEmp: Employee){
        const fullName = newEmp.firstName + " " + newEmp.lastName;
        await expect(this.page.getByText(fullName)).toBeVisible();
    }

    async openNewEmpPro(newEmp: Employee){
        const resPromise = this.page.waitForResponse(res =>
            res.url() === 'https://sandbox-api.brighthr.com/v1/rota/shift/settings'
            && res.status() === 200 && res.request().method() === 'GET'
        );
        await this.page.locator(`[href$="${newEmpId}"]`).click();
    }
}