import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

import { LayoutService } from '@core/services';
import {
  ContentComponent,
  MenuComponent,
  NavBarComponent
} from './containers';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    NavBarComponent,
    MenuComponent,
    ContentComponent
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'

})
export class LayoutComponent {

  constructor(
    private route: ActivatedRoute,
    public layoutService: LayoutService,
  ) {
    this.layoutService.showMenu = !this.route.children[1];
  }

  public toggleMenuState(isActive: boolean): void {
    this.layoutService.showMenu = isActive;
  }
}
