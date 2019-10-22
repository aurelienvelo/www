import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { AddUserComponent } from "./user/add-user/add-user.component";
import { ListUserComponent } from "./user/list-user/list-user.component";
import { EditUserComponent } from "./user/edit-user/edit-user.component";
import { AuthGuard } from './core/auth.guard';
import { AdminGuard } from './core/admin.guard'; 
import { HomeComponent } from './home/home.component';
import { DebrideurComponent } from './debrideur/debrideur.component';
import { MessageComponent } from './message/message.component';
import { AdminComponent } from './admin/admin.component';
import { CreateMessageComponent } from './message/create-message/create-message.component';
import { DetailMessageComponent } from './message/detail-message/detail-message.component';
import { EditMessageComponent } from './message/edit-message/edit-message.component';
import { ThemoviedbComponent } from './themoviedb/themoviedb.component';

const routes: Routes = [    
  { path: '', component: HomeComponent, canActivate:[AuthGuard] },
  { 
    path: 'messages', 
    canActivate:[AuthGuard],
    children: [
      { path: '', component: MessageComponent },
      { path: 'create', component: CreateMessageComponent },
      { path: 'details', component: DetailMessageComponent },
      { path: 'edit', component: EditMessageComponent }
    ]
  },
  { path: 'debrideur', component: DebrideurComponent, canActivate:[AuthGuard] },
  { path: 'tmdb', component: ThemoviedbComponent, canActivate:[AuthGuard] },
  { path: 'edit-user', component: EditUserComponent, canActivate:[AuthGuard] },
  { path: 'profil', component: EditUserComponent, canActivate:[AuthGuard] },
  { path: 'login', component: LoginComponent },
  { 
    path : 'admin', 
    canActivate:[AdminGuard],
    children: [
      { path: '', component: AdminComponent },
      { path: 'add-user', component: AddUserComponent },
      { path: 'list-user', component: ListUserComponent },
      { path: 'edit-user', component: EditUserComponent },
    ] 
  },  
  // otherwise redirect to home
  { path: '**', component: LoginComponent } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
