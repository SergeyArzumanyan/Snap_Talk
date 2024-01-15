import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import { AuthService } from '@core/services';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    RouterOutlet,
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
  constructor(
    public router: Router,
    public authService: AuthService,
  ) {}
}
