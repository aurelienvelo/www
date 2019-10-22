import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthentificationService } from '../../services/authentification.service';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit {

  @Output() sidenavClose = new EventEmitter();
  user: User;
  
  constructor(private router: Router, private authService: AuthentificationService) { }

  ngOnInit() {
    this.user = this.authService.currentUserValue;
  }

  onSidenavClose() {    
    this.sidenavClose.emit();
  }

  onEditProfil() {
    this.sidenavClose.emit();
    window.localStorage.removeItem("editUserId");
    window.localStorage.setItem("editUserId", this.authService.currentUserValue._id);
    this.router.navigate(['edit-user']);
  }

  onLogout() {    
    this.sidenavClose.emit();
    this.authService.logout();
  }
  
}
