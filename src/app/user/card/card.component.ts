import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-user',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardUserComponent implements OnInit {

  user: User;
  
  constructor(private router: Router, private authService: AuthentificationService) { }

  ngOnInit() {
    this.user = this.authService.currentUserValue;
  }

}
