import { Component, OnInit } from '@angular/core';

import { IUser } from "./interfaces";
import { HttpErrorResponse } from "@angular/common/http";
import { Subject, take, takeUntil } from "rxjs";
import { Methods } from "../methods";
import { HttpService } from "../core/services/http.service";

@Component({
  selector: 'app-users',
  standalone: true,
  providers: [HttpService],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
  public users: IUser[] = [];

  private unsubscribe$: Subject<void> = new Subject();

  constructor(private http: HttpService) {
  }

  ngOnInit(): void {
    this.getUsers();
  }

  public getUsers(): void {
    this.http.request<IUser[]>(
      'get',
      Methods.USERS
    )
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (res: IUser[]) => {
          this.users = res;
        },
        error: (err: HttpErrorResponse) => {
          console.log('Error occured in GET --', err);
        }
      });
  }

  public deleteUser(id: number): void {
    this.http.request<IUser[]>(
      'delete',
      Methods.USERS + id
    )
      .pipe(take(1))
      .subscribe({
        next: (res: IUser[]) => {
          this.users = res;
        },
        error: (err: HttpErrorResponse) => {
          console.log('Error occured in DELETE --', err);
        }
      })
  }

  public createUser(): void {
    const name: string = prompt('name') || 'NotSet';
    const age: string = prompt('age') || 'NotSet';

    const payload: any = { name, age };

    this.http.request<IUser[]>(
      'post',
      Methods.USERS,
      payload
    )
      .pipe(take(1))
      .subscribe({
        next: (res: IUser[]) => {
          this.users = res;
        },
        error: (err: HttpErrorResponse) => {
          console.log('Error occured in POST --', err);
        }
      })
  }

  public updateUser(user: IUser): void {
    const name: string = prompt('Name', user.name) || 'Not Set';
    const age: string = prompt('Age', String(user.age)) || '0';


    const updatedUser = { name, age };

    this.http.request<IUser[]>(
      'patch',
      Methods.USERS + user.id,
      updatedUser
    )
      .pipe(take(1))
      .subscribe({
        next: (res: IUser[]) => {
          this.users = res;
        },
        error: (err: HttpErrorResponse) => {
          console.log('Error occured in PATCH --', err);
        }
      });
  }
}
