import {Page} from '@playwright/test';
export class login{
    constructor(private page: Page){}

    async goto (url: string){
        await this.page.goto(url);
    }
    async fillCred(username: string, password: string){
        await this.page.locator('#username').fill(username);
        await this.page.locator('#password').fill(password);

    }
    async clickLogin(){
        await this.page.locator('#login').click();
    }
}