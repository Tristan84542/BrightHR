import {Page, expect} from '@playwright/test';
export class login{
    constructor(private page: Page){}

    async goto (url: string){
        await this.page.goto(url);
        await expect(this.page.locator('#username')).toBeVisible();
        await expect(this.page.locator('#password')).toBeVisible();
        await expect(this.page.locator('#login')).toBeEnabled();
    }
    async fillCred(username: string, password: string){
        await this.page.locator('#username').fill(username);
        await this.page.locator('#password').fill(password);

    }
    async clickLogin(){
        await this.page.locator('#login').click();
    }
}