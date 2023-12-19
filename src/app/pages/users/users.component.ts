import { Component, OnInit } from '@angular/core';
import { FormsModule } from "@angular/forms";

import { InputTextModule } from "primeng/inputtext";
import { RippleModule } from "primeng/ripple";
import { ButtonModule } from "primeng/button";

import {
  HttpService,
  WebsocketService,
  IMessage,
  IMessageSocketResponse, wsEvents,
} from "@app/core";

@Component({
  selector: 'app-users',
  standalone: true,
  providers: [HttpService],
  templateUrl: './users.component.html',
  imports: [
    FormsModule,
    InputTextModule,
    RippleModule,
    ButtonModule,
  ],
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
  public messages: IMessage[] = [];
  public Text: string = '';

  constructor(private websocketService: WebsocketService) {}

  ngOnInit(): void {
    this.connectToWebsocketServer();
  }

  private connectToWebsocketServer(): void {
    this.websocketService.listenToServer<IMessageSocketResponse>(wsEvents.onNewMessage)
      .subscribe({
        next: (res: IMessageSocketResponse): void => {
          this.messages = res.Messages;
        },
        error: (err): void => {
          console.group('Socket Connection Error');
          console.log('Socket Connection Error.');
          console.log(err);
          console.groupEnd();
        }
      });
  }

  public SendMessage(): void {
    const messagePayload: IMessage = {
      SenderId: 1,
      ChatId: 1,
      Text: this.Text
    };

    this.websocketService.emitToServer<IMessage>(wsEvents.sendMessage, messagePayload);
  }
}
