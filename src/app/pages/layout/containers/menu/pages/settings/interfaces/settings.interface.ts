import { FormControl } from "@angular/forms";

export interface IPersonalInfoForm {
  Name: FormControl<string | null>;
  Surname: FormControl<string | null>;
  Username:FormControl<string | null>;
  Mail: FormControl<string | null>;
}

export interface IAppearanceForm {
  IsDarkMode: FormControl<boolean | null>;
  MainColor: FormControl<string | null>;
}
