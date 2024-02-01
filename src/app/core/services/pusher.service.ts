import { Injectable } from '@angular/core';

import Pusher from 'pusher-js';

@Injectable({
  providedIn: 'root'
})
export class PusherService {

  private Pusher: Pusher;


  constructor() {
     this.Pusher = new Pusher(
      '2b94e02fd48e5a6dc4df',
      { cluster: 'eu' }
    );
  }

  public subscribeToChannel(channelName:  string): void {
    this.Pusher.subscribe(channelName);
  }

  public listenToChannelEvents(channelName: string, eventName: string, callBack: Function): void {
    this.Pusher.channel(channelName).bind(eventName, callBack);
  }
}
