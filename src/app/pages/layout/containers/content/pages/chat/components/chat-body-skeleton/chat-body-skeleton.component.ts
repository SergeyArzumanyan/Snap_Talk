import { Component } from '@angular/core';
import { DatePipe } from "@angular/common";

import { SkeletonModule } from "primeng/skeleton";

import { IsInViewListener } from "@core/directives";

@Component({
  selector: 'app-chat-body-skeleton',
  standalone: true,
  imports: [
    DatePipe,
    IsInViewListener,
    SkeletonModule,
  ],
  templateUrl: './chat-body-skeleton.component.html',
  styleUrl: './chat-body-skeleton.component.scss'
})
export class ChatBodySkeletonComponent {

}
