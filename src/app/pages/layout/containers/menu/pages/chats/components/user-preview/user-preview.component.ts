import { Component, Input } from '@angular/core';
import { Router, RouterLinkActive } from "@angular/router";
import { take } from "rxjs/operators";

import { RippleModule } from "primeng/ripple";

import { AuthService, ChatService } from "@app/core";
import { ImageComponent } from "@core/components";
import { ChatsComponent } from "../../";

@Component({
  selector: 'app-user-preview',
  standalone: true,
  imports: [
    RouterLinkActive,
    ImageComponent,
    RippleModule
  ],
  templateUrl: './user-preview.component.html',
  styleUrl: './user-preview.component.scss'
})
export class UserPreviewComponent {
  @Input({required: true}) User: any;

  constructor(
    private router: Router,
    private parent: ChatsComponent,
    private authService: AuthService,
    private chatService: ChatService,
  ) {}

  public startToChatWithUser(User: any): void {
    this.chatService.startToChatWithUser(
      this.authService.userData$.getValue().Id,
      User.Id
    )
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          if (!res?.chatAlreadyExists) {
            this.authService.userData$.next(res.User);
          }

          this.parent.chatSearchInput.nativeElement.value = '';
          this.router.navigate(['', { outlets: { content: ['chat', res.ChatId] } }]);
        },
        error: (err) => {
          console.group('HTTP Error')
          console.log('Something Went Wrong In \'startToChatWithUser\'');
          console.log(err);
          console.groupEnd();
        }
      });
  }
}
