import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';

import { AuthentificationService } from '../services/authentification.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Output() sidenavToggle = new EventEmitter();
  
  user: User;                  // {1}
  username: string;
  isAdmin: boolean;

  constructor(private router: Router, private authService: AuthentificationService) { }

  ngOnInit() {
    this.user = this.authService.currentUserValue;
    this.username = this.authService.currentUserValue.username;
    this.isAdmin = this.authService.currentUserValue.isAdmin;
  }

  onEditProfil() {
    window.localStorage.removeItem("editUserId");
    window.localStorage.setItem("editUserId", this.authService.currentUserValue._id);
    this.router.navigate(['edit-user']);
  }

  onLogout() {
    this.authService.logout();                      // {3}
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

}
