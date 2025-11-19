//*[@id="app"]/div/div/div[1]/div[1]/div/div[3]/a[3]/div/div/span
import { Page, expect } from "@playwright/test";
export class home{
    constructor(private page: Page){}
    async goEmpHub(){
        await this.page.getByTitle('Employees').click();
        await this.page.waitForLoadState('load');
        await expect(this.page.getByRole('button', {name : 'Add employee'})).toBeVisible();
        await expect(this.page.getByPlaceholder('Name or job title...')).toBeVisible();
    }
    async goDashboard(){
        await this.page.getByTitle('Home').click();
        await this.page.waitForLoadState('load');
        await expect(this.page.getByTestId('Dashboard')).toBeVisible();

    }
}