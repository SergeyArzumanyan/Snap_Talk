import { Component } from '@angular/core';

import { InputTextModule } from "primeng/inputtext";
import { ChatPreviewComponent } from "./components";

@Component({
  selector: 'app-chats',
  standalone: true,
  imports: [
    InputTextModule,
    ChatPreviewComponent,
  ],
  templateUrl: './chats.component.html',
  styleUrl: './chats.component.scss'
})
export class ChatsComponent {
  public chats: any[] = [
    {
      Id: 1,
      Name: 'Aram Asatryan',
      ImageName: '',
      LastMessage: 'Last Sent Message',
      LastMessageTime: '12:12'
    },
    {
      Id: 2,
      Name: 'Vrdanes Papazyan',
      ImageName: '',
      LastMessage: '',
      LastMessageTime: ''
    }
  ];

  constructor() {}

  public onSearch(e: Event): void {

  }
}
