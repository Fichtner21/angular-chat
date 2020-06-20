import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ChatComponent } from './chat/chat.component';
import { FormsModule } from '@angular/forms';
import { NGFORAGE_CONFIG_PROVIDER } from './ngforage.config';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent, HomeComponent, ChatComponent],
  imports: [
    BrowserModule, 
    AppRoutingModule, 
    FormsModule, 
    AngularFireModule.initializeApp(environment.firebase),    
  ],
  providers: [NGFORAGE_CONFIG_PROVIDER],
  bootstrap: [AppComponent],
})
export class AppModule {}
