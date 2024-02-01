import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

import { ILoginDataForm } from '@core/interfaces';
import { AuthComponent } from '@pages/auth';
import { ConfigService } from "@app/core";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    RippleModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  public loginForm: FormGroup<ILoginDataForm> = new FormGroup({
    Username: new FormControl<string>(null, [
      Validators.required,
    ]),
    Password: new FormControl<string>(null, [
      Validators.required,
    ]),
  });

  constructor(
    private parent: AuthComponent,
  ) {}

  public login(): void {
    if (this.loginForm.invalid) {
      return this.loginForm.markAllAsTouched();
    }

    this.parent.authService.login(this.loginForm.getRawValue())
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
