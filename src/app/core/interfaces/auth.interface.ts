import { FormControl } from "@angular/forms";

export interface ILoginData {
    UserName: string;
    Password: string;
}

export interface ILoginDataForm {
    UserName: FormControl<string>;
    Password: FormControl<string>;
}

export interface IRegisterData {
    UserName: string;
    Email: string;
    Password: string;
    ConfirmPassword: string;
    Name: string;
    Surname: string;
    Gender: string;
}

export interface IRegisterDataForm {
    UserName: FormControl<string>;
    Email: FormControl<string>;
    Password: FormControl<string>;
    ConfirmPassword: FormControl<string>;
    Name: FormControl<string>;
    Surname: FormControl<string>;
    Gender: FormControl<string>;
}

