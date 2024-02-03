import { Injectable, OnDestroy } from '@angular/core';
import { AuthService, HttpService, pusherEvents, PusherService } from "@app/core";
import { Observable, Subject, takeUntil } from "rxjs";

import { Methods } from "@app/methods";

@Injectable({
  providedIn: 'root'
})
export class ChatService implements OnDestroy {
  public chatId: number;
  public chatList: any[] = [];
  public Chat: any;
  public chatPending: boolean = true;

  public isToBottomArrowVisible: boolean = false;

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private authService: AuthService,
    private pusherService: PusherService,
    private http: HttpService,
  ) {
    this.setAndSubscribeToChatListChanges();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private setAndSubscribeToChatListChanges():  void {
    this.authService.userData$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (userData): void => {
          this.chatList = userData.Chats;
          for (const chat of this.chatList) {
            this.makeChatNameAndImage(chat);
          }
        }
      });

    this.pusherService.listenToChannelEvents(
      `user-${this.authService.userData$.getValue().Id}`,
      pusherEvents.onChatChanges,
      (changedChat: any): void => {
        for (const chat of this.chatList) {
          if (chat.Id === changedChat.ChatId) {
            chat.LastMessage = changedChat.LastMessage.Text;
            chat.LastMessageDate = changedChat.LastMessage.CreatedAt;
          }
        }
      }
    );

    const user = this.authService.userData$.getValue();

    this.pusherService.listenToChannelEvents(
      `user-${user.Id}`,
      pusherEvents.onChatMemberChanges,
      (updatedChatMemberData): void => {
        this.updateChatMemberInfo(user, updatedChatMemberData);
      }
    );
  }

  public makeChatNameAndImage(chat: any): void {
    chat.isGroupChat = chat.Users.length > 2;

    if (!chat.isGroupChat) {
      const otherUser = chat.Users
        .find((user) => user.Id !== this.authService.userData$.getValue().Id);

      chat.Name = otherUser.FullName;
      chat.Image = otherUser.ProfileImage;
    }
  }

  public groupByDate(arr: any[]): [string, object][] {
    return Object.entries(
      arr.reduce((acc, message) => {
        const date: string = new Date(message.CreatedAt).toDateString();

        acc[date] = acc[date] || [];
        acc[date].push(message);

        return acc;
      }, {})
    );
  }

  public startToChatWithUser(SenderId: number, ReceiverId: number): Observable<any> {
    return this.http.request<any>(
      'post',
      Methods.CHATS + `${SenderId}/chat/${ReceiverId}`,
    );
  }

  public getChatById(ChatId: number): Observable<any> {
    return this.http.request<any>(
      'get',
      Methods.CHATS + ChatId,
    );
  }

  public getChatMessages(ChatId: number, take: number, skip: number): Observable<any> {
    const payload: any = {
      take,
      skip,
    };

    return this.http.request<any>(
      'get',
      Methods.CHATS + `messages/${ChatId}`,
      null,
      true,
      { params: { ...payload } },
    );
  }

  public addMessageToChat(ChatId: number, SenderId: number, payload: any): Observable<any> {
    return this.http.request<any>(
      'post',
      Methods.CHATS + `${ChatId}/${SenderId}`,
      payload,
    );
  }

  private updateChatMemberInfo(user, updatedChatMemberData): void {
    for (let i = 0; i < this.chatList.length; i++) {
      for (let j = 0; j < this.chatList[i].Users.length; j++) {
        if (this.chatList[i].Users[j].Id === updatedChatMemberData.Id) {
          this.chatList[i].Users[j] = updatedChatMemberData;
          this.Chat = this.chatList[i];
          this.makeChatNameAndImage(this.Chat);
        }
      }
    }
  }
}
