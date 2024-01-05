import { ChangeDetectorRef, Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from "@angular/common/http";

import { LayoutService } from '@core/services';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HttpClientModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  @HostListener('window:resize')
  detectDeviceView(): void {
    if (
      this.layoutService.isMobile && window.innerWidth > 768 ||
      !this.layoutService.isMobile && window.innerWidth < 768
    ) {
      this.layoutService.isMobile = window.innerWidth < 768;
    }
  }

  constructor(private layoutService: LayoutService) {
    this.detectDeviceView();
  }
}
