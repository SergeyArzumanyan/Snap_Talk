import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Subject, takeUntil } from "rxjs";

import {
  ChatHeaderComponent,
  ChatBodyComponent,
  ChatFooterComponent,
} from "./components";


@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    ChatHeaderComponent,
    ChatFooterComponent,
    ChatBodyComponent
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnDestroy {
  public chatId: number;

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private route: ActivatedRoute) {
    this.subscribeToRouteChanges();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private subscribeToRouteChanges(): void {
    this.route.paramMap
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (params: ParamMap): void => {
          this.chatId = +params.get('id');
        }
      });
  }

  //  For testing Purposes.
  public messages: any[] = [
    {
      Id: 1,
      SenderId: 1,
      Text: 'Lorem Ipsum\n is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s',
      CreatedAt: '2024-01-24T07:02:26.378Z'
    },
    {
      Id: 1,
      SenderId: 2,
      Text: 'Other User\'s Lorem Ipsum text',
      CreatedAt: '2024-01-24T07:02:26.378Z'
    },
    {
      Id: 1,
      SenderId: 2,
      Text: 'Other User\'s Lorem Ipsum text, Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the',
      CreatedAt: '2024-01-24T07:02:26.378Z'
    },
    {
      Id: 1,
      SenderId: 1,
      Text: 'Text Text TextTextTextText',
      CreatedAt: '2024-01-24T07:02:26.378Z'
    },
    {
      Id: 1,
      SenderId: 1,
      Text: 'Hello World !',
      CreatedAt: '2024-01-24T07:02:26.378Z'
    },
    {
      Id: 1,
      SenderId: 1,
      Text: 'Lorem Ipsum\n is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s',
      CreatedAt: '2024-01-24T07:02:26.378Z'
    },
    {
      Id: 1,
      SenderId: 2,
      Text: 'Other User\'s Lorem Ipsum text',
      CreatedAt: '2024-01-24T07:02:26.378Z'
    },
    {
      Id: 1,
      SenderId: 2,
      Text: 'Other User\'s Lorem Ipsum text, Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the',
      CreatedAt: '2024-01-24T07:02:26.378Z'
    },
    {
      Id: 1,
      SenderId: 1,
      Text: 'Text Text TextTextTextText',
      CreatedAt: '2024-01-24T07:02:26.378Z'
    },
    {
      Id: 1,
      SenderId: 1,
      Text: 'Hello World !',
      CreatedAt: '2024-01-24T07:02:26.378Z'
    },
    {
      Id: 1,
      SenderId: 1,
      Text: 'Lorem Ipsum\n is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s',
      CreatedAt: '2024-01-24T07:02:26.378Z'
    },
    {
      Id: 1,
      SenderId: 2,
      Text: 'Other User\'s Lorem Ipsum text',
      CreatedAt: '2024-01-24T07:02:26.378Z'
    },
    {
      Id: 1,
      SenderId: 2,
      Text: 'Other User\'s Lorem Ipsum text, Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the',
      CreatedAt: '2024-01-24T07:02:26.378Z'
    },
    {
      Id: 1,
      SenderId: 1,
      Text: 'Text Text TextTextTextText',
      CreatedAt: '2024-01-24T07:02:26.378Z'
    },
    {
      Id: 1,
      SenderId: 1,
      Text: 'Hello World !',
      CreatedAt: '2024-01-24T07:02:26.378Z'
    },
    {
      Id: 1,
      SenderId: 1,
      Text: 'Lorem Ipsum\n is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s',
      CreatedAt: '2024-01-24T07:02:26.378Z'
    },
    {
      Id: 1,
      SenderId: 2,
      Text: 'Other User\'s Lorem Ipsum text',
      CreatedAt: '2024-01-24T07:02:26.378Z'
    },
    {
      Id: 1,
      SenderId: 2,
      Text: 'Other User\'s Lorem Ipsum text, Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the',
      CreatedAt: '2024-01-24T07:02:26.378Z'
    },
    {
      Id: 1,
      SenderId: 1,
      Text: 'Text Text TextTextTextText',
      CreatedAt: '2024-01-24T07:02:26.378Z'
    },
    {
      Id: 1,
      SenderId: 1,
      Text: 'Hello World !',
      CreatedAt: '2024-01-24T07:02:26.378Z'
    },
  ];
}
