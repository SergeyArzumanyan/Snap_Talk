import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

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

}
