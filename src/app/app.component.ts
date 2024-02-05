import { Component, HostListener, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AsyncPipe } from "@angular/common";

import { PrimeNGConfig } from "primeng/api";

import { ConfigService, LayoutService } from '@core/services';

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
export class AppComponent implements OnInit {
  @HostListener('window:resize')
  detectDeviceView(): void {
    if (
      this.layoutService.isMobile && window.innerWidth > 768 ||
      !this.layoutService.isMobile && window.innerWidth < 768
    ) {
      this.layoutService.isMobile = window.innerWidth < 768;
    }
  }

  constructor(
    private layoutService: LayoutService,
    public configService: ConfigService,
    private primengConfig: PrimeNGConfig,
  ) {
    this.detectDeviceView();
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }
}
