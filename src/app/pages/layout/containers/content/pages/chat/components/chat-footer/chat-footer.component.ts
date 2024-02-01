import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { take } from "rxjs/operators";

import { InputTextareaModule } from "primeng/inputtextarea";

import { ChatComponent } from "../../";

@Component({
  selector: 'app-chat-footer',
  standalone: true,
  imports: [
    InputTextareaModule,
    ReactiveFormsModule,
  ],
  templateUrl: './chat-footer.component.html',
  styleUrl: './chat-footer.component.scss'
})
export class ChatFooterComponent {
  public MessageText: FormControl<string> = new FormControl<string>(null);

  constructor(private parent: ChatComponent) {}

  public sendMessage(): void {
    if (this.MessageText.value) {
      const payload: any = {
        Text: this.MessageText.value
      };

      this.parent.chatService.addMessageToChat(
        this.parent.chatService.chatId,
        this.parent.authService.userData$.getValue().Id,
        payload,
      )
        .pipe(take(1))
        .subscribe({
          next: (): void => {
            this.MessageText.reset();
          },
          error: (err): void => {
            console.group('HTTP Error')
            console.log('Something Went Wrong In \'addMessageToChat\'');
            console.log(err);
            console.groupEnd();
          }
        });
    }
  }
}
