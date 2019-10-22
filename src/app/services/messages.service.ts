import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { ApiResponse } from '../models/api.response';
import { Message } from "../models/message.model";

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private http: HttpClient) { }
  baseUrl: string = 'https://api.velo-nas.ovh/api/messages/';

  getMessages(params: HttpParams) : Observable<ApiResponse> {    
    return this.http.get<ApiResponse>(this.baseUrl, { params });
  }

  getMessage(id: String) : Observable<ApiResponse> {    
    return this.http.get<ApiResponse>(this.baseUrl + id);
  }

  createMessage(message: Message): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl + 'new', message);
  }

  updateMessage(message: Message): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(this.baseUrl + message._id, message);
  }

  deleteMessage(id: String): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(this.baseUrl + id);
  }
}
