import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { DatePipe } from "@angular/common";

import { TooltipModule } from "primeng/tooltip";

import { ImageComponent } from "@core/components";

@Component({
  selector: 'app-chat-preview',
  standalone: true,
  imports: [
    RouterLinkActive,
    RouterLink,
    ImageComponent,
    DatePipe,
    TooltipModule,
  ],
  templateUrl: './chat-preview.component.html',
  styleUrl: './chat-preview.component.scss'
})
export class ChatPreviewComponent {
  @Input({required: true}) Chat: any;
}
