import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { catchError, filter, take, switchMap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private auth:AuthService, private jwtHelper: JwtHelperService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    request = request.clone({
      setHeaders: {
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${this.auth.isExpired()?null:this.jwtHelper.tokenGetter()}` 
      }
    });
    return next.handle(request);
  }

}