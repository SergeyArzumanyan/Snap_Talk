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
    Username: new FormControl<string>('', Validators.required),
    Password: new FormControl<string>('', Validators.required),
  });

  constructor(
    private configService: ConfigService,
    private parent: AuthComponent,
  ) {}

  public login(): void {
    if (this.loginForm.valid) {
      this.parent.authService.login(this.loginForm.getRawValue())
        .subscribe({
          next: (res) => {
            this.parent.authService.userData$.next(res);
            this.parent.authService.isAuthenticated$.next(true);
            this.parent.router.navigate(['/']);

            const { Theme, ThemeColor } = res.AppearanceSettings;
            this.configService.applyUserThemeSettings(Theme, ThemeColor);
          },
          error: (err: HttpErrorResponse) => {
            console.error(err);
          }
        });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
