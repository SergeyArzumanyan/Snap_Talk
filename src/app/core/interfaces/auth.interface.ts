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
    ConfirmPassword: string;
    Name: string;
    Surname: string;
    Gender: string;
}

export interface IRegisterDataForm {
    Username: FormControl<string>;
    Email: FormControl<string>;
    Password: FormControl<string>;
    ConfirmPassword: FormControl<string>;
    Name: FormControl<string>;
    Surname: FormControl<string>;
    Gender: FormControl<string>;
}

