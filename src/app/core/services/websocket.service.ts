import { Injectable } from '@angular/core';
import { Observable, Subscriber } from "rxjs";

import * as socketIo from 'socket.io-client';

import { environment } from "@env/environment";

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private clientSocket: socketIo.Socket;

  constructor() {
    this.clientSocket = socketIo.connect(environment.ApiUrl);
  }

  public listenToServer<bodyType>(socketEvent: string): Observable<bodyType> {
    return new Observable<bodyType>((subscribe: Subscriber<bodyType>): void => {
      this.clientSocket
        .on(socketEvent, (socketMessageBody: bodyType): void => {
        subscribe.next(socketMessageBody);
      });
    });
  }

  public emitToServer<bodyType>(connection: string, socketMessageBody: bodyType): void {
    this.clientSocket.emit(connection, socketMessageBody);
  }
}
