import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { TooltipModule } from 'primeng/tooltip';

import { IMenuIcon } from '@app/core';

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
  public navItems: IMenuIcon[] = [
    {
      Tooltip: 'Profile',
      Link: ['profile'],
      Icon: 'ri-user-line',
      ActiveIcon: 'ri-user-fill',
    },
    {
      Tooltip: 'Messages',
      Link: ['messages'],
      Icon: 'ri-chat-4-line',
      ActiveIcon: 'ri-chat-4-fill',
    },
    {
      Tooltip: 'Settings',
      Link: ['settings'],
      Icon: 'ri-settings-line',
      ActiveIcon: 'ri-settings-fill',
    },
  ];
}
