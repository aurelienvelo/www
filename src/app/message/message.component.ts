import { Component, OnInit } from '@angular/core';
import { Message } from '../models/message.model';
import { MessagesService } from '../services/messages.service';
import { Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { AlertService } from '../services/alert.service';
import { User } from '../models/user.model';
import { AuthentificationService } from '../services/authentification.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  messages : Message[];
  params: HttpParams = new HttpParams();
  currentPage: number = 0;
  maxPage: number;    
  user: User;

  constructor(private router: Router, private authService: AuthentificationService, private messagesService: MessagesService, private alertService: AlertService) { }

  ngOnInit() {
    if(!window.localStorage.getItem('currentUser')) {
      this.router.navigate(['login']);
      return;
    }
    this.user = this.authService.currentUserValue;

    this.params = this.params.append('fields', '*')
    this.params = this.params.append('limit', '10');
    this.params = this.params.append('offset', '0');
    this.params = this.params.append('order', '-dateCreated');

    this.getMessages();
  }

  getMessages() {
    this.messagesService.getMessages(this.params)
    .subscribe( data => {
      this.maxPage = parseInt(data.message);
      this.messages = data.result;      
    });
  }

  previewPage() {
    // update current page of items   
    this.currentPage = this.currentPage > 0 ? this.currentPage - 1 : this.currentPage;
    this.params = this.params.set('offset', parseInt(this.params.get('offset')) > 0 ? (parseInt(this.params.get('offset'), 10) - parseInt(this.params.get('limit'))).toString(10) : '0');
    this.getMessages();
  }

  nextPage() {
    // update current page of items
    this.currentPage = this.currentPage < this.maxPage ? this.currentPage + 1 : this.maxPage;
    this.params = this.params.set('offset', this.currentPage < this.maxPage ? (parseInt(this.params.get('offset'), 10) + parseInt(this.params.get('limit'))).toString(10) : '0');
    this.getMessages();
  }

  addMessage(newMessage: Message) {
    this.messages.push(newMessage);
  }

  onLike(message) {
    
  }

  onDislike(message) {
    
  }

  onEdit(message) {
    window.localStorage.removeItem("editMessageId");
    window.localStorage.setItem("editMessageId", message._id.toString());
    this.router.navigate(['/messages/edit']);
  }

  onDelete(message) {    
    this.messagesService.deleteMessage(message._id)
    .subscribe(data => {
      if (data.status === 200) { 
        this.messages = this.messages.filter(item => item !== message);       
      } else {
        this.alertService.error("Erreur: " + data.message);
      } 
    });
  } 

}
