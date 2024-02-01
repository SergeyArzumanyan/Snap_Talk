import { FormControl } from "@angular/forms";

export interface IPersonalInfoForm {
  FullName: FormControl<string>;
  Username:FormControl<string>;
  Email: FormControl<string>;
}

export interface IAppearanceForm {
  IsDarkTheme: FormControl<boolean>;
  ThemeColor: FormControl<string >;
}
