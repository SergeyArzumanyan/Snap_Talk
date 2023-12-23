import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from "@angular/forms";

import { InputTextModule } from "primeng/inputtext";
import { RippleModule } from "primeng/ripple";
import { ButtonModule } from "primeng/button";

import {
  HttpService,
  PusherService,
  IMessage, pusherEvents, pusherChannels, IChat, IAddMessageBody,
} from "@app/core";
import { UsersService } from "@pages/users/services";
import { Subject, takeUntil } from "rxjs";
import { IUser, IUserAddBody } from "@pages/users/interfaces";

@Component({
  selector: 'app-users',
  standalone: true,
  providers: [
    HttpService,
    UsersService,
    PusherService,
  ],
  templateUrl: './users.component.html',
  imports: [
    FormsModule,
    InputTextModule,
    RippleModule,
    ButtonModule,
  ],
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit, OnDestroy {
  public messages: IMessage[] = [];
  public SenderId: string = '';
  public ChatId: string = '';
  public Text: string = '';

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private usersService: UsersService,
    private pusherService: PusherService
  ) {
  }

  ngOnInit(): void {
    this.getAllChatMessages();
    this.subscribeToMessages();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public addMessageToChat(): void {
    const messagePayload: IAddMessageBody = {
      SenderId: +this.SenderId,
      ChatId: +this.ChatId,
      Text: this.Text
    };


    this.usersService.addMessageToChat(messagePayload)
      .subscribe({
        next: (res: IMessage[]): void => {
          this.messages = res;
        },
        error: (err): void => {
          console.group('HTTP Error')
          console.log('Something Went Wrong In \'addMessageToChat\'');
          console.log(err);
          console.groupEnd();
        }
      });
  }

  public getAllChatMessages() {
    this.usersService.getAllMessagesByChatId(+this.SenderId || 1, +this.ChatId || 1)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (res: IMessage[]): void => {
          this.messages = res;
        },
        error: (err): void => {
          console.group('HTTP Error')
          console.log('Something Went Wrong In \'getAllChatMessages\'');
          console.log(err);
          console.groupEnd();
        }
      });
  }

  private subscribeToMessages(): void {
    this.pusherService.subscribeToPusherChannel(pusherChannels.chatChannel);

    this.pusherService.listenToChannelEvents(
      pusherChannels.chatChannel,
      pusherEvents.onNewMessage,
      (newMessage: IMessage) => {
        this.handleIncomingMessages(newMessage);
      }
    );
  }

  private handleIncomingMessages(message: IMessage): void {
    this.messages.push(message);
  }
}
