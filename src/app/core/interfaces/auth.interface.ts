import { FormControl } from "@angular/forms";

export interface ILoginData {
    UserName: string;
    Password: string;
}

export interface ILoginDataForm {
    UserName: FormControl<string>;
    Password: FormControl<string>;
}