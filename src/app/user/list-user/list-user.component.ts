import { Component, OnInit , Inject} from '@angular/core';
import {Router} from "@angular/router";
import {User} from "../../models/user.model";
import {UsersService} from "../../services/users.service";

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {

  users: User[];

  constructor(private router: Router, private userService: UsersService) { }

  ngOnInit() {
    if(!window.localStorage.getItem('currentUser')) {
      this.router.navigate(['login']);
      return;
    }
    this.userService.getUsers()
      .subscribe( data => {
        this.users = data.result;
      });
  }

  deleteUser(user: User): void {
    this.userService.deleteUser(user._id)
      .subscribe( data => {
        this.users = this.users.filter(u => u !== user);
      })
  };

  editUser(user: User): void {
    window.localStorage.removeItem("editUserId");
    window.localStorage.setItem("editUserId", user._id.toString());
    this.router.navigate(['/admin/edit-user']);
  };

  addUser(): void {
    this.router.navigate(['/admin/add-user']);
  };
}