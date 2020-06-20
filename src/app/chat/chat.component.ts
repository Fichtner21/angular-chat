import { Component, OnInit } from '@angular/core';
import { ChatService } from './chat.service';
import { Observable } from 'rxjs';
import { scan, tap, startWith } from 'rxjs/operators';
import { ChatMessage } from './chat-message.interface';
import { NgForageCache } from 'ngforage';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  public messageText = '';
  public messages$: Observable<ChatMessage[]>;

  constructor(private chatService: ChatService, private ngForageCache: NgForageCache) { }

  public async ngOnInit(): Promise<void> {
    const initialMessages: ChatMessage[] = await this.ngForageCache.getItem('messages') ?? [];

    this.messages$ = this.chatService.message$.pipe(
      // scan((message: ChatMessage[], message: ChatMessage) => [...messages, message], []),
      scan((messages: ChatMessage[], message: ChatMessage) => {
        messages.push(message);
        return messages;
      }, initialMessages), //scan podobny do reduce
      tap(async (messages: ChatMessage[]) => {
        await this.ngForageCache.setItem('messages', messages);
      }),
      startWith(initialMessages),
    );
  }

  public send(){
    const text = this.messageText.trim();
    if(text){
      this.chatService.send({
        text, //shorthand 
        authorId: 'Ernest',              
      });

      this.messageText = '';
    }    
  }

}
