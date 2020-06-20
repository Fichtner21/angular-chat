import { Component, OnInit } from '@angular/core';
import { ChatService } from './chat.service';
import { Observable } from 'rxjs';
import { scan, tap, startWith } from 'rxjs/operators';
import { ChatMessage } from './chat-message.interface';
import { NgForageCache } from 'ngforage';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  public messageText = '';
  public messages$: Observable<ChatMessage[]>;
  public authorId: string;
  

  constructor(
    private chatService: ChatService, 
    private ngForageCache: NgForageCache, 
    private fireAuth: AngularFireAuth, 
    private router: Router,
    private firestore: AngularFirestore) { }

  public async ngOnInit(): Promise<void> {
    const initialMessages: ChatMessage[] = await this.ngForageCache.getItem('messages') ?? [];

    // const initialMessages: ChatMessage[] = await this.firestore.collection<ChatMessage>('messages').valueChanges().toPromise();

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

    this.fireAuth.user.subscribe((user: firebase.User) => {
      this.authorId = user?.email;   
      if(user === null){
        this.router.navigateByUrl('');
      }   
    })
  }

  public send(){
    const text = this.messageText.trim();
    if(text && this.authorId){
      this.chatService.send({
        text, //shorthand (to samo co text: text,)
        authorId: this.authorId,              
      });

      this.messageText = '';
    }    
  }

}
