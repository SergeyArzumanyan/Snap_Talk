import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { take } from "rxjs/operators";

import { InputTextareaModule } from "primeng/inputtextarea";

import { ChatComponent } from "../../";
import { RippleModule } from "primeng/ripple";

@Component({
  selector: 'app-chat-footer',
  standalone: true,
  imports: [
    InputTextareaModule,
    ReactiveFormsModule,
    RippleModule,
  ],
  templateUrl: './chat-footer.component.html',
  styleUrl: './chat-footer.component.scss'
})
export class ChatFooterComponent {
  @ViewChild('messageTextArea') messageTextArea: ElementRef;

  public MessageText: FormControl<string> = new FormControl<string>(null);

  constructor(private parent: ChatComponent) {}

  public sendMessage(): void {
    if (this.MessageText.value) {
      const payload: any = {
        Text: this.MessageText.value.trim(),
      };

      this.MessageText.reset();
      this.messageTextArea.nativeElement.focus();

      this.parent.chatService.addMessageToChat(
        this.parent.chatService.chatId,
        this.parent.authService.userData$.getValue().Id,
        payload,
      )
        .pipe(take(1))
        .subscribe({
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
