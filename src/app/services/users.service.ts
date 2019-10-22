import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {User} from "../models/user.model";
import {Observable} from "rxjs/index";
import {ApiResponse} from "../models/api.response";

@Injectable()
export class UsersService {

  constructor(private http: HttpClient) { }
  baseUrl: string = 'https://api.velo-nas.ovh/api/users/';

  login(loginPayload) : Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl + 'login', loginPayload);
  }

  changePassword(passwordPayload) : Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl + 'password', passwordPayload);
  }

  getUsers() : Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrl);
  }

  getUserById(id: String): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrl + id);
  }

  createUser(user: User): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl + 'register', user);
  }

  updateUser(user: User): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(this.baseUrl + user._id, user);
  }

  deleteUser(id: String): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(this.baseUrl + id);
  }
}