import {Page, expect} from "@playwright/test";
import { employee } from "../object/employee";

export class empProfile{
    constructor(private page: Page){}

    async verifyEmployee(emp: employee){
        try {
            await this.verifyDetails(emp);
        } catch (error){
            console.log('Some field is empty, try reload page and check again');
            await this.page.reload();
            await this.page.waitForLoadState('networkidle');
            await this.verifyDetails(emp);
        }
    }

    async verifyDetails(emp: employee){
        await expect(this.page.locator('#firstName')).toHaveAttribute('value', emp.firstName);
        await expect(this.page.locator('#lastName')).toHaveAttribute('value', emp.lastName);
        await expect(this.page.locator('#email')).toHaveAttribute('value', emp.email);
        await expect(this.page.locator('#phoneNumber')).toHaveAttribute('value', emp.phone);
        await expect(this.page.locator('#startDate')).toHaveText(emp.startDate);
        await expect(this.page.locator('#jobTitle')).toHaveAttribute('value', emp.jobTitle);
    }
}