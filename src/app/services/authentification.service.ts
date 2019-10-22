import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { UsersService } from './users.service'; 
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthentificationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    baseUrl: string = 'https://api.velo-nas.ovh/api/users/';

    constructor(private usersService: UsersService) {        
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {        
        return this.currentUserSubject.value;
    }

    login(loginPayload) {      
        return this.usersService.login(loginPayload)
        .pipe(map(data => {
            let user: User = null;
            // login successful if there's a jwt token in the response
            if (data && data.result && data.result.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                user = data.result;  
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
            }

            return user;
        }));
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
        location.reload(true);
    }
}