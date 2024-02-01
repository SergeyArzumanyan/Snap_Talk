import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import { AuthService, ConfigService } from '@core/services';

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
    private configService: ConfigService,
  ) {}

  public setUserDataAndSubscribeToChanges(user: any): void {
    this.configService.subscribeToUserDataChanges(user);

    this.authService.userData$.next(user);
    this.authService.isAuthenticated$.next(true);

    const { Theme, ThemeColor } = user.AppearanceSettings;
    this.configService.applyUserThemeSettings(Theme, ThemeColor);

    this.router.navigate(['/']);
  }
}
