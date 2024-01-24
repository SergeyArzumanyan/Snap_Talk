import { Component } from '@angular/core';
import { InputTextModule } from "primeng/inputtext";
import { InputTextareaModule } from "primeng/inputtextarea";

@Component({
  selector: 'app-chat-footer',
  standalone: true,
  imports: [
    InputTextareaModule,
  ],
  templateUrl: './chat-footer.component.html',
  styleUrl: './chat-footer.component.scss'
})
export class ChatFooterComponent {

  constructor() {}

  public sendMessage(): void {

  }
}
