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
    Username: new FormControl<string>('', Validators.required),
    Password: new FormControl<string>('', Validators.required),
    ConfirmPassword: new FormControl<string>('', Validators.required),
    Email: new FormControl<string>('', [
      Validators.required,
      Validators.email,
    ]),
    Name: new FormControl<string>('', Validators.required),
    Surname: new FormControl<string>('', Validators.required),
    Gender: new FormControl<string>('', Validators.required),
  });

  public genders: string[] = [
    'Male',
    'Female',
  ];

  constructor(
    private parent: AuthComponent,
    public layoutService: LayoutService,
  ) {}

  public register(): void {
    if (this.registerForm.valid) {
      this.parent.authService.register(this.registerForm.getRawValue())
        .subscribe({
          next: (data) => {
            this.parent.authService.userData$.next(data);
            this.parent.authService.isAuthenticated$.next(true);
            this.parent.router.navigate(['/']);
          },
          error: (err: HttpErrorResponse) => {
            console.error(err);
          }
        });
    }
  }
}
