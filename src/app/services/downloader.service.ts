import { Injectable } from '@angular/core';
import {ApiResponse} from "../models/api.response";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class DownloaderService {
  constructor(private http: HttpClient) { }

  baseUrl: string = 'https://api.velo-nas.ovh/api/download/';

  downloadFile(filename: string, infosDownload: any)  {
    let payload = {
      filename: filename,
      infosDownload: infosDownload
    };
    return this.http.post<ApiResponse>(this.baseUrl, payload);
  }

  getFiles(params: HttpParams) : Observable<ApiResponse> {    
    return this.http.get<ApiResponse>(this.baseUrl, { params });
  }

  deleteFile(id: String): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(this.baseUrl + id);
  }
}
