import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AsyncPipe } from "@angular/common";

import { PrimeNGConfig } from "primeng/api";

import { ConfigService, LayoutService, UsersService } from '@core/services';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    AsyncPipe,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  @HostListener('window:resize')
  detectDeviceView(): void {
    if (
      this.layoutService.isMobile && window.innerWidth > 768 ||
      !this.layoutService.isMobile && window.innerWidth < 768
    ) {
      this.layoutService.isMobile = window.innerWidth < 768;
    }
  }

  @HostListener('document:visibilitychange')
  onVisibilityChange(): void {
    document.hidden ?
      this.usersService.changeStatus(false) :
      this.usersService.changeStatus(true);
  }

  constructor(
    private layoutService: LayoutService,
    public configService: ConfigService,
    private primengConfig: PrimeNGConfig,
    private usersService: UsersService,
  ) {
    this.detectDeviceView();
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }

  ngOnDestroy(): void {
    this.usersService.changeStatus(false);
  }
}
