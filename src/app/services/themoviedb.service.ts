import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ThemoviedbService {
  
  baseUrl: string = 'https://api.themoviedb.org/3';
  

  constructor(private http: HttpClient) { }

  multiSearch(query: string, page?: number) : Observable<any> {  
    const params: HttpParams = new HttpParams()
    .set('api_key', '121f729904d9230fdacb5897e089576b')
    .set('language', 'fr-FR')
    .set('query', query);  
    return this.http.get<any>(this.baseUrl + '/search/multi', { params });
  }

  SearchMovie(query: string, page?: number) : Observable<any> {  
    const params: HttpParams = new HttpParams()
    .set('api_key', '121f729904d9230fdacb5897e089576b')
    .set('language', 'fr-FR')
    .set('query', query);  
    return this.http.get<any>(this.baseUrl + '/search/movie', { params });
  }

  SearchTv(query: string, page?: number) : Observable<any> {  
    const params: HttpParams = new HttpParams()
    .set('api_key', '121f729904d9230fdacb5897e089576b')
    .set('language', 'fr-FR')
    .set('query', query);  
    return this.http.get<any>(this.baseUrl + '/search/tv', { params });
  }

}
