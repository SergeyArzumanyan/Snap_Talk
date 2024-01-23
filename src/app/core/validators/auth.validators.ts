import { FormGroup, ValidationErrors } from "@angular/forms";

export class AuthValidators {
    public static passwordsMatch(group: FormGroup): ValidationErrors | null {
        if (group.get('Password').value !== group.get('ConfirmPassword').value) {
            return { passwordsMatch: true };
        } else {
            return null;
        }
    }
}