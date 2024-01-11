import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
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

import { AuthService } from '@core/services';
import { ILoginDataForm } from '@core/interfaces'; 

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
    UserName: new FormControl<string>('', Validators.required),
    Password: new FormControl<string>('', Validators.required),
  });

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  public login(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.getRawValue())
        .subscribe({
          next: (data) => {
            this.authService.userData$.next(data);
            this.authService.isAuthenticated$.next(true);
            this.router.navigate(['/']);
          },
          error: (err: HttpErrorResponse) => {
            console.error(err);
          }
        });
    }
  }
}
