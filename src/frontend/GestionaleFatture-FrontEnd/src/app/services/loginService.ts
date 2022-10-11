import { HttpClient } from '@angular/common/http';
import { PasswordEncrypterService } from './passwordEncrypterService';
import { of, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    constructor(private http:HttpClient, private passwordEncrypterService:PasswordEncrypterService) {}

    public getToken(){
        return localStorage.getItem(environment.tokenName);
    }

    public login(username:string, password:string):Observable<any> {
        return this.http.post(
            environment.backendServerIP + "login",
            {
                "username": username,
                "password": this.passwordEncrypterService.encrypt(password)
            }
        )
    }
}