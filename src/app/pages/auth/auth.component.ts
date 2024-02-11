import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import {
  AuthService,
  ConfigService,
  LayoutService,
} from '@core/services';
import { HeadingInfo, IHeadingInfo } from "@pages/auth/auth.consts";

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
  public headingInfo: IHeadingInfo = HeadingInfo;

  constructor(
    public router: Router,
    public authService: AuthService,
    private configService: ConfigService,
    public layoutService: LayoutService,
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
