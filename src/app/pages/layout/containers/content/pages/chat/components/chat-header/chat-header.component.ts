import { Component, Input } from '@angular/core';
import { Router } from "@angular/router";
import { LayoutService } from "@app/core";

import { ImageComponent } from "@core/components";

@Component({
  selector: 'app-chat-header',
  standalone: true,
  imports: [
    ImageComponent
  ],
  templateUrl: './chat-header.component.html',
  styleUrl: './chat-header.component.scss'
})
export class ChatHeaderComponent {
  @Input({ required: true }) imageName: string;
  @Input({ required: true }) fullName: string;


  constructor(
    private router: Router,
    public layoutService: LayoutService
  ) {
  }

  public navigateBack(): void {
    this.router.navigateByUrl('chats');
  }
}
