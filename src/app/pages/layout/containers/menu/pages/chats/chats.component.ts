import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { debounceTime, switchMap, take } from "rxjs/operators";
import { Subject, takeUntil } from "rxjs";
import { AsyncPipe } from "@angular/common";

import { InputTextModule } from "primeng/inputtext";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { TooltipModule } from "primeng/tooltip";

import { AuthService, ChatService, UsersService } from "@app/core";
import {
  AddGroupComponent,
  ChatPreviewComponent,
  UserPreviewComponent,
} from "./components";

@Component({
  selector: 'app-chats',
  standalone: true,
  imports: [
    InputTextModule,
    ChatPreviewComponent,
    AsyncPipe,
    UserPreviewComponent,
    TooltipModule,
  ],
  providers: [
    DynamicDialogRef,
    DialogService,
  ],
  templateUrl: './chats.component.html',
  styleUrl: './chats.component.scss'
})
export class ChatsComponent implements OnDestroy {
  @ViewChild('searchInput') chatSearchInput: ElementRef;
  private searchSubject$: Subject<string> = new Subject<string>();

  public searchedUsers: any[] = [];

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    public authService: AuthService,
    private usersService: UsersService,
    public chatService: ChatService,
    private ref: DynamicDialogRef,
    private dialogService: DialogService,
  ) {
    this.subscribeToSearchInputChanges();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private subscribeToSearchInputChanges(): void {
    this.searchSubject$
      .pipe(
        debounceTime(300),
        switchMap((SearchString: string) => this.usersService.getFilteredUsers(
          this.authService.userData$.getValue().Id,
          SearchString
        )),
        takeUntil(this.unsubscribe$)
      )
      .subscribe({
        next: (foundUsers: any[]): void => {
          this.searchedUsers = foundUsers;
        },
        error: (err): void => {
          console.group('HTTP Error')
          console.log('Something Went Wrong In \'subscribeToSearchInputChanges\'');
          console.log(err);
          console.groupEnd();
        }
      });
  }

  public onSearch(): void {
    const inputValue: string = this.chatSearchInput.nativeElement.value.trim();

    if (inputValue) {
      this.searchSubject$.next(inputValue);
    }
  }

  public addGroup(): void {
    this.ref = this.dialogService.open(AddGroupComponent, {
      header: 'Add Group',
      modal: true,
      closeOnEscape: true,
      dismissableMask: true,
      width: '40vw',
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw'
      },
      styleClass: 'dialog-with-footer',
    });

    this.ref.onClose
      .pipe(take(1))
      .subscribe({
        next: (res): void => {
          // ...
        }
      });
  }
}
