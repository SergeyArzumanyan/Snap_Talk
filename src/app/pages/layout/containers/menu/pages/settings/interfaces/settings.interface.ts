import { FormControl } from "@angular/forms";

export interface IPersonalInfoForm {
  Name: FormControl<string>;
  Surname: FormControl<string>;
  Username:FormControl<string>;
  Mail: FormControl<string>;
}

export interface IAppearanceForm {
  IsDarkTheme: FormControl<boolean>;
  ThemeColor: FormControl<string >;
}
