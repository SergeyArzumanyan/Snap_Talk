import { FormControl } from "@angular/forms";

export interface IAddGroupForm {
  Name: FormControl<string>;
  Members: FormControl<number[]>;
}
