import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { LayoutService } from "@app/core";

import { ImageComponent, UserStatusComponent } from "@core/components";
import { ChatComponent } from "../../";
import { TooltipModule } from "primeng/tooltip";

@Component({
  selector: 'app-chat-header',
  standalone: true,
  imports: [
    ImageComponent,
    TooltipModule,
    UserStatusComponent,
  ],
  templateUrl: './chat-header.component.html',
  styleUrl: './chat-header.component.scss'
})
export class ChatHeaderComponent {
  constructor(
    public parent: ChatComponent,
    private router: Router,
    public layoutService: LayoutService,
  ) {}

  public navigateBack(): void {
    this.router.navigateByUrl('chats');
  }
}
