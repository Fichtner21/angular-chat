/**
 * Komponent wyświetlający listę zadań pobranych z bazy danych Firebase.
 */
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Todo } from './todo.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  /**
   * Statyczna stałą przechowująca nazwę kolekcji w bazie danych Firebase.
   */
  private static readonly COLLECTION_KEY = 'todos';

  /**
   * Strumień przechowujący aktualny model danych pobrany z Firestore.
   */
  public todos$: Observable<Todo[]>;

  /**
   * Wstrzyknięty w konstruktorze serwis `AngularFirestore` służy do komunikacji z bazą danych Firebase.
   */
  constructor(private firestore: AngularFirestore) {}

  /**
   * Podczas inicjowania komponentu wartość pola `todos$` ustawiana jest na strumień zmian wartości wskazanej kolekcji.
   * Dowolna zmiana w modelu danych w bazie danych powoduje wyemitowanie nowej wartości.
   * Przekazany do metody `valueChanges` obiekt pozwala na zdefiniowanie pola z bazy danych służącego do identyfikacji elementów kolekcji.
   */
  ngOnInit(): void {
    this.todos$ = this.firestore.collection<Todo>(HomeComponent.COLLECTION_KEY).valueChanges({ idField: 'id' });
  }

  /**
   * Metoda dodawania dokumentów do kolekcji w bazie danych.
   */
  public addTodo(text: string) {
    this.firestore.collection(HomeComponent.COLLECTION_KEY).add({
      text,
      done: false,
    });
  }

  /**
   * Metoda służąca do aktualizacji pól dokumentu ze wskazanej kolekcji.
   */
  public setDone(todo: Todo, done: boolean) {
    this.firestore
      .collection(HomeComponent.COLLECTION_KEY)
      .doc(todo.id)
      .update({ done });
  }

  /**
   * Metoda służąca do kasowania dokumentów o przekazanym ID z kolekcji.
   */
  public deleteTodo(todo: Todo) {
    this.firestore
      .collection(HomeComponent.COLLECTION_KEY)
      .doc(todo.id)
      .delete();
  }
}