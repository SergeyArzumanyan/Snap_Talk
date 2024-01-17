import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

import { HttpService, IAddMessageBody, IChat, IMessage } from "@app/core";
import { IUser, IUserAddBody } from "@pages/users/interfaces";
import { Methods } from "@app/methods";

@Injectable({
  providedIn: 'root',
})
export class UsersService {

  constructor(private http: HttpService) {}

  public addUser(payload: IUserAddBody): Observable<IUser> {
    return this.http.request<IUser>(
      'post',
      Methods.USERS,
      payload
    );
  }

  public getAllUsers(): Observable<IUser[]> {
    return this.http.request<IUser[]>(
      'get',
      Methods.USERS
    );
  }

  public getUserById(Id: number): Observable<IUser> {
    return this.http.request<IUser>(
      'get',
      Methods.USERS + Id
    );
  }


  public deleteUser(Id: number): Observable<IUser> {
    return this.http.request<IUser>(
      'delete',
      Methods.USERS + Id
    );
  }

  public addChatToUser(UserId: number): Observable<IChat> {
    return this.http.request<IChat>(
      'post',
      Methods.USERS + `${UserId}/chat`
    );
  }

  public deleteChatFromUser(UserId: number, ChatId: number): Observable<IChat> {
    return this.http.request<IChat>(
      'delete',
      Methods.USERS + `${UserId}/chat/${ChatId}`
    );
  }

  public getAllUserChats(UserId: number): Observable<IChat[]> {
    return this.http.request<IChat[]>(
      'get',
      Methods.USERS + `${UserId}/chats`,
    );
  }

  public getAllMessagesByChatId(UserId: number, ChatId: number): Observable<IMessage[]> {
    return this.http.request<IMessage[]>(
      'get',
      Methods.USERS + `${UserId}/chats/${ChatId}`,
    );
  }

  public addMessageToChat(payload: IAddMessageBody): Observable<IMessage[]> {
    return this.http.request<IMessage[]>(
      'post',
      Methods.USERS + `${payload.SenderId}/chats/${payload.ChatId}`,
      payload
    );
  }
}
