import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

import { ILoginDataForm } from '@core/interfaces';
import { AuthComponent } from '@pages/auth';

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

  public isSubmitted: boolean = false;
  public wrongCredentials: boolean = false;
  public loginPending: boolean = false;

  constructor(
    private parent: AuthComponent,
  ) {}

  public login(): void {
    this.isSubmitted = true;

    if (this.loginForm.invalid) {
      return this.loginForm.markAllAsTouched();
    }

    this.loginPending = true;

    this.parent.authService.login(this.loginForm.getRawValue())
      .subscribe({
        next: (user): void => {
          this.parent.setUserDataAndSubscribeToChanges(user);
          this.loginPending = false;
        },
        error: (): void => {
          this.loginPending = false;
          this.wrongCredentials = true;
        }
      });
  }
}
