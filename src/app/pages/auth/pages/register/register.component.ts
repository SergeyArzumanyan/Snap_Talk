import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

import { LayoutService } from '@core/services';
import { IRegisterDataForm } from '@core/interfaces';
import { AuthValidators } from '@core/validators';
import { AuthComponent } from '@pages/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    SelectButtonModule,
    ButtonModule,
    RippleModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  public registerForm: FormGroup<IRegisterDataForm> = new FormGroup({
    Username: new FormControl<string>(null, [
      Validators.required,
    ]),
    Password: new FormControl<string>(null, [
      Validators.required,
    ]),
    ConfirmPassword: new FormControl<string>(null, [
      Validators.required,
    ]),
    Email: new FormControl<string>(null, [
      Validators.required,
      Validators.email,
    ]),
    FullName: new FormControl<string>(null, [
      Validators.required,
    ]),
    Gender: new FormControl<string>(null, [
      Validators.required,
    ]),
  }, AuthValidators.passwordsMatch);

  public genders: string[] = [
    'Male',
    'Female',
  ];

  constructor(
    private parent: AuthComponent,
    public layoutService: LayoutService,
  ) {}

  public register(): void {
    if (this.registerForm.invalid) {
      return this.registerForm.markAllAsTouched();
    }

    const { ConfirmPassword, ...requestBody } = this.registerForm.getRawValue();
    this.parent.authService.register(requestBody)
      .subscribe({
        next: (user): void => {
          this.parent.setUserDataAndSubscribeToChanges(user);
        },
        error: (err: HttpErrorResponse): void => {
          console.error(err);
        }
      });
  }
}
