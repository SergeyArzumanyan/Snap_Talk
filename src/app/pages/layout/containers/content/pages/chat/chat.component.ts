import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { take } from "rxjs/operators";
import { NgClass } from "@angular/common";

import { RippleModule } from "primeng/ripple";

import {
  ChatHeaderComponent,
  ChatBodyComponent,
  ChatFooterComponent,
} from "./components";
import {
  AuthService,
  ChatService,
  PusherService,
  pusherEvents,
  LayoutService,
} from "@app/core";


@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    ChatHeaderComponent,
    ChatFooterComponent,
    ChatBodyComponent,
    NgClass,
    RippleModule,
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnDestroy {
  public messages: any[] = [];
  public groupedMessages;

  constructor(
    private layoutService: LayoutService,
    public authService: AuthService,
    private pusherService: PusherService,
    public route: ActivatedRoute,
    public router: Router,
    public chatService: ChatService,
  ) {
    if (this.layoutService.isMobile) {
      this.layoutService.showNavBar = false;
    }

    this.subscribeToMessageEvents();
  }

  ngOnDestroy(): void {
    this.layoutService.showNavBar = true;
  }

  public getChatById(): void {
    /** @desc Setting to false When Pushing Messages Into Chat Body */
    this.chatService.chatPending = true;

    this.chatService.getChatById(this.chatService.chatId)
      .pipe(take(1))
      .subscribe({
        next: (chat): void => {
          this.chatService.Chat = chat;
          this.chatService.makeChatNameAndImage(this.chatService.Chat);
        },
        error: (err): void => {
          if (err?.error?.message) {
            this.router.navigateByUrl('chats');
            /** #ToDo Error Handling */
              console.error('Chat doesn\'t exist');
            /**--------------------- */
          }
        }
      });
  }

  private addMessageToChat(ChatChanges: any): void {
    this.chatService.chatList = ChatChanges.ChatList;

    this.chatService.chatList.forEach(chat => {
      this.chatService.makeChatNameAndImage(chat);
    });

    const isInSameChatView: boolean = this.chatService.chatId === ChatChanges.ChatId;

    if (isInSameChatView) {
      this.messages.push(ChatChanges.LastMessage);
      this.groupedMessages = this.chatService.groupByDate(this.messages);
      this.scrollChatToBottom();
    }
  }

  public scrollChatToBottom(): void {
    const chatBody: HTMLElement = document.getElementById('chatBody');

    setTimeout((): void => {
      chatBody.scrollTo({
        top: chatBody.scrollHeight,
        behavior: 'smooth',
      })
    }, 0);
  }

  private subscribeToMessageEvents(): void {
    this.pusherService.listenToChannelEvents(
      `user-${this.authService.userData$.getValue().Id}`,
      pusherEvents.onChatChanges,
      (chatChanges) => this.addMessageToChat(chatChanges),
    );
  }
}
