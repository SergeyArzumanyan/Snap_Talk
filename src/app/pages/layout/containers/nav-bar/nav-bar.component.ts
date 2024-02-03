import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

import { TooltipModule } from 'primeng/tooltip';

import { LayoutService } from '@core/services';
import { IMenuIcon } from '@core/interfaces';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    NgClass,
    TooltipModule,
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent {

  public navItems: IMenuIcon[] = [{
      Tooltip: 'Chats',
      Link: 'chats',
      Icon: 'ri-chat-3-line',
      ActiveIcon: 'ri-chat-3-fill',
    },
    {
      Tooltip: 'Settings',
      Link: 'settings',
      Icon: 'ri-settings-5-line',
      ActiveIcon: 'ri-settings-5-fill',
    },
  ];

  constructor(
    private router: Router,
    public layoutService: LayoutService
  ) {}

  public navigateToRoute(navItem: IMenuIcon): void {
    this.router.navigate([navItem.Link]);
  }
}
