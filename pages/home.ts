//*[@id="app"]/div/div/div[1]/div[1]/div/div[3]/a[3]/div/div/span
import { Page } from "@playwright/test";
export class home{
    constructor(private page: Page){}
    async goEmpHub(){
        await this.page.getByTitle('Employees').click();
    }
}