import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { AsyncPipe, DatePipe, NgClass } from "@angular/common";
import { ParamMap } from "@angular/router";
import { Subject, takeUntil } from "rxjs";
import { finalize } from "rxjs/operators";

import { ChatBodySkeletonComponent } from "../chat-body-skeleton";
import { ChatComponent } from "../../";
import { IsInViewListener } from "@core/directives";

@Component({
  selector: 'app-chat-body',
  standalone: true,
  imports: [
    AsyncPipe,
    NgClass,
    DatePipe,
    IsInViewListener,
    ChatBodySkeletonComponent,
  ],
  templateUrl: './chat-body.component.html',
  styleUrl: './chat-body.component.scss'
})
export class ChatBodyComponent implements OnInit, OnDestroy {
  @ViewChild('chatBody') chatBody: ElementRef;

  private take: number = 15;
  private skip: number = 0;

  private firstMessagesLoaded: boolean = false;
  private firstScrollToBottomCompleted: boolean = false;
  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    public parent: ChatComponent,
    private renderer: Renderer2,
    ) {}

  ngOnInit(): void {
    this.subscribeToRouteChanges();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onScroll(): void {
    if (this.firstMessagesLoaded && this.firstScrollToBottomCompleted) {
      const scrollPosition: number = this.chatBody.nativeElement.scrollTop;
      const scrollHeight: number = this.chatBody.nativeElement.scrollHeight;
      const diff: number = scrollHeight - scrollPosition;

      const didntGetAllChatMessages: boolean = (this.skip + this.take) < this.parent.chatService.Chat?.MessagesCount;

      this.parent.chatService.isToBottomArrowVisible = diff >= 1200;

      if (scrollPosition <= 200 && didntGetAllChatMessages) {
        this.skip += this.take;
        this.getChatMessages();
      }
    }
  }

  private getChatMessages(): void {
    this.parent.chatService.getChatMessages(
      this.parent.chatService.chatId,
      this.take,
      this.skip,
    )
      .pipe(
        finalize((): boolean => this.parent.chatService.chatPending = false),
        takeUntil(this.unsubscribe$)
      )
      .subscribe({
        next: (changedChatWithMessages): void => {
          this.addMessagesToChat(changedChatWithMessages);
        },
        error: (err): void => {
          console.group('HTTP Error')
          console.log('Something Went Wrong In \'getChatMessages\'');
          console.log(err);
          console.groupEnd();
        }
      });
  }

  private addMessagesToChat(changedChatWithMessages: any): void {
    for (const message of changedChatWithMessages.ChatMessages) {
      if (!this.parent.messages.find(msg => msg.Id === message.Id)) {
        this.parent.messages.unshift(message);

        if (this.firstMessagesLoaded) {
          const messageDate: string = new Date(message.CreatedAt).toDateString();
          const thereIsntGroupWithThisMessageDate: boolean = !this.parent.groupedMessages
            .find((groupEntry: [string, any[]]): boolean => groupEntry[0] === messageDate);

          if (thereIsntGroupWithThisMessageDate) {
            this.parent.groupedMessages.unshift([messageDate, []]);
          }

          this.parent.groupedMessages.forEach((groupEntry: [string, any[]]): void => {
            if (groupEntry[0] === messageDate) {
              groupEntry[1].unshift(message);
            }
          });
        }
      }
    }

    if (!this.firstMessagesLoaded) {
      this.parent.groupedMessages = this.parent.chatService.groupByDate(this.parent.messages);
      this.scrollChatBodyToBottom();
      this.firstScrollToBottomCompleted = true;
    }
  }

  public isUserSentMessage(message: any): boolean {
    return this.parent.authService.userData$.getValue().Id === message.SenderId;
  }

  private scrollChatBodyToBottom(): void {
    setTimeout((): void => {
      this.renderer.setProperty(
        this.chatBody.nativeElement,
        'scrollTop',
        this.chatBody.nativeElement.scrollHeight
      );

      if (!this.firstMessagesLoaded) {
        this.firstMessagesLoaded = true;
      }
    }, 0);
  }

  private subscribeToRouteChanges(): void {
    this.parent.route.paramMap
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (params: ParamMap): void => {
          this.parent.chatService.chatId = +params.get('id');
          this.parent.getChatById();

          this.parent.chatService.isToBottomArrowVisible = false;
          this.parent.messages = [];
          this.parent.groupedMessages = [];

          this.skip = 0;
          this.firstMessagesLoaded = false;
          this.getChatMessages();
        }
      });
  }
}
