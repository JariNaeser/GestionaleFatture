import { HttpClient } from '@angular/common/http';
import { PasswordEncrypterService } from './passwordEncrypterService';
import { of, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment.prod';


@Injectable({
    providedIn: 'root'
})
export class CustomersService {

    constructor(private http:HttpClient, private passwordEncrypterService:PasswordEncrypterService) {}

    public getCompanies():Observable<any>{
        return this.http.get(environment.backendServerIP + "getCompanies");
    }

    public getCompany(id : number):Observable<any>{
        return this.http.get(environment.backendServerIP + `getCompanies/${id}`);
    }

    public getPrivatePersons():Observable<any>{
        return this.http.get(environment.backendServerIP + "getPrivatePersons");
    }

    public getPrivatePerson(id : number):Observable<any>{
        return this.http.get(environment.backendServerIP + `getPrivatePerson/${id}`);
    }

    public addCompany(newCompanyData):Observable<any>{
        return this.http.put(
            environment.backendServerIP + `addCompany`,
            newCompanyData
        );
    }

}