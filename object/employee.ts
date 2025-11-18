export class employee{
   firstName: string;
   lastName: string;
   email: string;
   phone: string;
   jobTitle: string;
   startDate: string;
   startYear: number; 
   uid: string;

    constructor(firstName: string, lastName: string, email: string, 
    phone: string, jobTitle: string, startDate: string, startYear: number, uid: string) 
    {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.jobTitle = jobTitle;
        this.startDate = startDate;
        this.startYear = startYear;
        this.uid = uid;
    }
}

export function initEmp(){
    const fName = new Date().toISOString();
    const lName = 'Test';
    const email = 'test@error.test';
    const phone = '12345678';
    const jobTitle = 'Tester'
    const startYear = new Date().getFullYear() + 1;
    let temp = new Date(`${startYear}-01-01`);
    const weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const startDate = `${weekday[temp.getDay()]} ${String(temp.getDate()).padStart(2,'0')} ${months[temp.getMonth()]} ${temp.getFullYear()}`;
    const uid = '';
    return new employee(fName, lName, email, phone, jobTitle, startDate, startYear, uid);
}