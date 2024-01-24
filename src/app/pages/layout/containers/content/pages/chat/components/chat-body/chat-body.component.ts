import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { AsyncPipe, DatePipe, NgClass } from "@angular/common";

import { AuthService } from "@app/core";

@Component({
  selector: 'app-chat-body',
  standalone: true,
  imports: [
    AsyncPipe,
    NgClass,
    DatePipe
  ],
  templateUrl: './chat-body.component.html',
  styleUrl: './chat-body.component.scss'
})
export class ChatBodyComponent implements AfterViewInit {
  @ViewChild('chatBody') chatBody: ElementRef;

  @Input() messages: any[] = [];

  public userId: number = this.authService.userData$.getValue().Id;

  constructor(private authService: AuthService) {}

  ngAfterViewInit(): void {
    this.scrollChatBodyToBottom();
  }

  public isUserSentMessage(message: any): boolean {
    return this.userId === message.SenderId;
  }

  private scrollChatBodyToBottom(): void {
    this.chatBody.nativeElement.scrollTop = this.chatBody.nativeElement.scrollHeight;
  }
}
