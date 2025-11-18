import {Page, expect} from "@playwright/test";
import { Employee } from "../object/employee";

export class empProfile{
    constructor(private page: Page){}

    async verifyEmployee(emp: Employee){
        await expect(this.page.locator('#firstName')).toHaveAttribute('value', emp.firstName);
        await expect(this.page.locator('#lastName')).toHaveAttribute('value', emp.lastName);
        await expect(this.page.locator('#email')).toHaveAttribute('value', emp.email);
        await expect(this.page.locator('#phoneNumber')).toHaveAttribute('value', emp.phone);
        await expect(this.page.locator('#startDate')).toHaveText(emp.startDate);
        await expect(this.page.locator('#jobTitle')).toHaveAttribute('value', emp.jobTitle);
    }
}