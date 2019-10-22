import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {Injectable} from "@angular/core";
import {catchError} from "rxjs/operators"; 
import {throwError} from "rxjs"; 
import { AuthentificationService } from '../services/authentification.service';
import { AlertService } from '../services/alert.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let currentUser = JSON.parse(window.localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + currentUser.token
        }
      });
    }
    return next.handle(request);
  }
}


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthentificationService, private alertService: AlertService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {          
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                this.authenticationService.logout();
                location.reload(true);
            }

            // if (err.status > 100 && err.status < 200) {
            //   this.alertService.info(err.message);
            // }

            // if (err.status > 200 && err.status < 300) {
            //   this.alertService.success(err.message);
            // }

            // if (err.status > 400 || err.status === 0) {
            //   this.alertService.error(err.message);
            // }
            
            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
    }
}