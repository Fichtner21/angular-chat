import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable, Subscriber } from 'rxjs';
import { ChatMessage } from './chat-message.interface';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private static readonly SOCKET_URL = 'https://chat-server.fbg.pl/';
  private static readonly EVENT_TYPE = 'chat message';
  private socket: SocketIOClient.Socket;

  public message$: Observable<ChatMessage>;

  constructor() { 
    this.socket = io.connect(ChatService.SOCKET_URL);

    this.message$ = new Observable((subscriber: Subscriber<ChatMessage>) => {
      //nasłuchiwanie
      this.socket.on(ChatService.EVENT_TYPE, (message) => {
        subscriber.next(message);
      });
    });    
  }

  public send(message: ChatMessage){
    this.socket.emit(ChatService.EVENT_TYPE, message);
  }
}
