import { Component, OnInit } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public todos$: Observable<any>;
  public newTodo = '';

  constructor(private firestore: AngularFirestore) { }

  ngOnInit(): void {
    //this.todos$ = this.firestore.collection('todos').valueChanges()

    // this.firestore.collection('todos').snapshotChanges().pipe(
    //   map((snapshot: DocumentChangeAction<any>[]) => snapshot.map(action => action.payload.doc.data()))
    // );
    // .subscribe((changes: DocumentChangeAction<any>[]) => {

    // });
  }

  public addTodo(){
    this.firestore.collection('todos').add({
      text: this.newTodo,
      done: false,
    })
  }
}
