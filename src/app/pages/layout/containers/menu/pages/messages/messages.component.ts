import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [
    RouterLink,
    AvatarModule,
    BadgeModule,
  ],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss'
})
export class MessagesComponent {

}
