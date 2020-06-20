import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ChatComponent } from './chat/chat.component';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';

const routes: Routes = [{
  path: '',
  component: HomeComponent,
},{
  path: 'chat',
  component: ChatComponent,
  canActivate: [AngularFireAuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
