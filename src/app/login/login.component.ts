import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router, ActivatedRoute} from "@angular/router";
import {first} from "rxjs/operators";

//import {UsersService} from "../services/users.service";
import {AuthentificationService} from "../services/authentification.service"; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  invalidLogin: boolean = false;
  returnUrl: string;
  constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute, private authentificationService: AuthentificationService) { }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    const loginPayload = {
      email: this.loginForm.controls.email.value,
      password: this.loginForm.controls.password.value
    }
    this.authentificationService.login(loginPayload)
    .pipe(first())
    .subscribe(
        data => {                
            location.assign(this.returnUrl);       
        },
        error => {
            // this.alertService.error(error);
            // this.loading = false;
        });       
  }

  ngOnInit() {
    window.localStorage.removeItem('token');
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required])],
      password: ['', Validators.required]
    });
  }

}
