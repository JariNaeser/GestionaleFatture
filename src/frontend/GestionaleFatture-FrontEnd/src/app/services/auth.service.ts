import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthService {
    
  constructor(public jwtHelper: JwtHelperService) {}

  public isAuthenticated(): boolean {
    return !this.jwtHelper.isTokenExpired(this.jwtHelper.tokenGetter());
  }

  public getUserType(): string{
    return (this.jwtHelper.tokenGetter() != null)?this.jwtHelper.decodeToken(this.jwtHelper.tokenGetter()).userType:undefined;
  }

  public getUsername(): string{
    return (this.jwtHelper.tokenGetter() != null)?this.jwtHelper.decodeToken(this.jwtHelper.tokenGetter()).username:undefined;
  }

  public isExpired(){
    return this.jwtHelper.isTokenExpired(this.jwtHelper.tokenGetter());
  }
}