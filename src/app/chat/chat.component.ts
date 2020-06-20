import { Component, OnInit } from '@angular/core';
import { ChatService } from './chat.service';
import { Observable } from 'rxjs';
import { scan } from 'rxjs/operators';
import { ChatMessage } from './chat-message.interface';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  public messageText = '';
  public messages$: Observable<ChatMessage[]>;

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.messages$ = this.chatService.message$.pipe(
      // scan((message: ChatMessage[], message: ChatMessage) => [...messages, message], []),
      scan((messages: ChatMessage[], message: ChatMessage) => {
        messages.push(message);
        return messages;
      }, []), //scan podobny do reduce
    );
  }

  public send(){
    const text = this.messageText.trim();
    if(text){
      this.chatService.send({
        text, //shorthand 
        authorId: 'Ernest'              
      });

      this.messageText = '';
    }    
  }

}
