import { Component } from '@angular/core';
import { 
  FormControl, 
  FormGroup, 
  ReactiveFormsModule, 
  Validators 
} from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';

import { AuthService } from '@core/services';
import { ILoginDataForm } from '@core/interfaces'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  public loginForm: FormGroup<ILoginDataForm> = new FormGroup({
    UserName: new FormControl<string>('', Validators.required),
    Password: new FormControl<string>('', Validators.required),
  });

  constructor(private authService: AuthService) {
  }

  public login(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.getRawValue());
    }
  }
}
