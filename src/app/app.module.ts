import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ListUserComponent } from './user/list-user/list-user.component';
import { AddUserComponent } from './user/add-user/add-user.component';
import { EditUserComponent, NgbdModalContent } from './user/edit-user/edit-user.component';

import { MaterialModule } from './material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

//import {routing} from "./app.routing";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {UsersService} from "./services/users.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {TokenInterceptor, ErrorInterceptor} from "./core/interceptor";
import { NavbarComponent } from './navbar/navbar.component';
import { AuthentificationService } from './services/authentification.service';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout/layout.component';
//import { AlertComponent } from './alert/alert.component'; 
import { AlertService } from './services/alert.service';
import { DebrideurComponent } from './debrideur/debrideur.component';
import { DebrideurService } from './services/debrideur.service';
import { DebrideurDetailComponent } from './debrideur/debrideur-detail/debrideur-detail.component';
import { MessageComponent } from './message/message.component';
import { DetailMessageComponent } from './message/detail-message/detail-message.component';
import { CreateMessageComponent } from './message/create-message/create-message.component';
import { EditMessageComponent } from './message/edit-message/edit-message.component';
import { MessagesService } from './services/messages.service';
import { AdminComponent } from './admin/admin.component';
import { DownloaderComponent } from './downloader/downloader.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CardUserComponent } from './user/card/card.component';
import { SidenavListComponent } from './navbar/sidenav-list/sidenav-list.component';
import { ThemoviedbComponent, NgbdModalTitle } from './themoviedb/themoviedb.component';
import { AlertModule } from './alert/alert.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListUserComponent,
    AddUserComponent,
    EditUserComponent,
    NavbarComponent,
    HomeComponent,    
    LayoutComponent,
    DebrideurComponent,
    DebrideurDetailComponent,
    MessageComponent,
    DetailMessageComponent,
    CreateMessageComponent,
    EditMessageComponent,
    AdminComponent,
    DownloaderComponent,
    CardUserComponent,
    SidenavListComponent,
    ThemoviedbComponent,
    NgbdModalContent,
    NgbdModalTitle
  ],
  entryComponents: [
    NgbdModalContent,
    NgbdModalTitle
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,    
    MaterialModule,
    FlexLayoutModule,
    AlertModule,
    NgbModule
  ],
  providers: [
    UsersService, 
    AuthentificationService,
    AlertService,
    DebrideurService,
    MessagesService,
    NgbActiveModal,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi : true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi : true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
