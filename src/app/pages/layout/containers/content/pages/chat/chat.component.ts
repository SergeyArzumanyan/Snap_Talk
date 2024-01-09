import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from "@angular/router";

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {
  public chatId: number;

  constructor(private route: ActivatedRoute) {
    this.subscribeToRouteChanges();
  }

  private subscribeToRouteChanges(): void {
    this.route.paramMap
      .subscribe({
        next: (params: ParamMap): void => {
          this.chatId = +params.get('id');
        }
      });
  }
}
