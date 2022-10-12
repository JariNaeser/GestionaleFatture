import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import * as cryptoJS from 'crypto-js';

@Injectable({
    providedIn: 'root'
})

export class PasswordEncrypterService {

    constructor() { }

    public encrypt(password:string){
        return cryptoJS.SHA256(password + environment.salt).toString();
    }
}