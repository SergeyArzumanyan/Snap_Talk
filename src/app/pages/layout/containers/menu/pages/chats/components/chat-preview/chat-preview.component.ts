import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";

import { ImageComponent } from "@core/components";

@Component({
  selector: 'app-chat-preview',
  standalone: true,
  imports: [
    RouterLinkActive,
    RouterLink,
    ImageComponent
  ],
  templateUrl: './chat-preview.component.html',
  styleUrl: './chat-preview.component.scss'
})
export class ChatPreviewComponent {
  @Input({required: true}) ChatId: number;
  @Input({required: true}) ChatName: string;
  @Input({required: true}) ChatImageName: string;
  @Input() ChatLastMessage: string;
  @Input() ChatLastMessageTime: string;

  constructor() {}
}
