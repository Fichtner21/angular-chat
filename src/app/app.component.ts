import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public user$: Observable<firebase.User>;

  constructor(private fireAuth: AngularFireAuth){
    this.user$ = this.fireAuth.user;    
  }

  public login(){
    const authProvider = new auth.GoogleAuthProvider();
    this.fireAuth.signInWithPopup(authProvider);
  }

  public logout(){
    this.fireAuth.signOut();
  }
}
