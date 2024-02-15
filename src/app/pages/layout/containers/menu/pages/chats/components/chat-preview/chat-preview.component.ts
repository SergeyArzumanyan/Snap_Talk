import { Component, Input } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { DatePipe } from "@angular/common";

import { TooltipModule } from "primeng/tooltip";
import { RippleModule } from "primeng/ripple";

import { ImageComponent, UserStatusComponent } from "@core/components";

@Component({
  selector: 'app-chat-preview',
  standalone: true,
  imports: [
    RouterLinkActive,
    RouterLink,
    ImageComponent,
    DatePipe,
    TooltipModule,
    RippleModule,
    UserStatusComponent,
  ],
  templateUrl: './chat-preview.component.html',
  styleUrl: './chat-preview.component.scss'
})
export class ChatPreviewComponent {
  @Input({required: true}) Chat: any;

  constructor(private router: Router) {}

  public enterTheChat(Id: number): void {
    this.router.navigate(['', { outlets: { content: ['chat', Id] } }]);
  }
}
