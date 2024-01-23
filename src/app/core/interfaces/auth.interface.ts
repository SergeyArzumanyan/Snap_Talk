import { FormControl } from "@angular/forms";

export interface ILoginData {
    Username: string;
    Password: string;
}

export interface ILoginDataForm {
    Username: FormControl<string>;
    Password: FormControl<string>;
}

export interface IRegisterData {
    Username: string;
    Email: string;
    Password: string;
    FirstName: string;
    LastName: string;
    Gender: string;
}

export interface IRegisterDataForm {
    Username: FormControl<string>;
    Email: FormControl<string>;
    Password: FormControl<string>;
    ConfirmPassword: FormControl<string>;
    FirstName: FormControl<string>;
    LastName: FormControl<string>;
    Gender: FormControl<string>;
}

