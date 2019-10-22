import { Injectable } from '@angular/core';
import {ApiResponse} from "../models/api.response";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DebrideurService {
  constructor(private http: HttpClient) { }

  baseUrl: string = 'https://api.velo-nas.ovh/api/debrid/';

  DownloadLink(payload)  {
    return this.http.post<ApiResponse>(this.baseUrl, payload);
  }
}
