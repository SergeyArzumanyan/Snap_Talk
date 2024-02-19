import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { HttpErrorResponse } from "@angular/common/http";
import { Subject, takeUntil } from "rxjs";
import { take } from "rxjs/operators";

import { ButtonModule } from "primeng/button";
import { MultiSelectModule } from "primeng/multiselect";
import { InputTextModule } from "primeng/inputtext";
import { DynamicDialogRef } from "primeng/dynamicdialog";

import { ChatService, UsersService } from "@app/core";
import { IAddGroupForm } from "../../interfaces";

@Component({
  selector: 'app-add-group',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    MultiSelectModule,
  ],
  templateUrl: './add-group.component.html',
  styleUrl: './add-group.component.scss'
})
export class AddGroupComponent {
  public addGroupForm: FormGroup<IAddGroupForm> = new FormGroup<IAddGroupForm>({
    Name: new FormControl(null, [
      Validators.required,
    ]),
    UserIds: new FormControl(null, [
      Validators.required,
    ])
  });

  public users: any[] = [];

  public pending: boolean = false;

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private ref: DynamicDialogRef,
    private usersService: UsersService,
    private chatService: ChatService,
  ) {
    this.getAllUsers();
  }

  private getAllUsers(): void {
    this.usersService.getAllUsers()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (res): void => {
          this.users = res;
        },
        error: (err: HttpErrorResponse): void => {
          console.group('HTTP Error')
          console.log('Something Went Wrong In \'getAllUsers\'');
          console.log(err);
          console.groupEnd();
        }
      })
  }

  public cancel(): void {
    this.ref.close();
  }

  public onAdd(): void {
    if (this.addGroupForm.invalid) {
      return this.addGroupForm.markAllAsTouched();
    }

    this.chatService.createGroupChat(this.addGroupForm.value)
      .pipe(take(1))
      .subscribe({
        next: (): void => {
          this.ref.close();
        },
        error: (err: HttpErrorResponse): void => {
          console.group('HTTP Error')
          console.log('Something Went Wrong In \'createGroupChat\'');
          console.log(err);
          console.groupEnd();
        }
      });
  }
}
