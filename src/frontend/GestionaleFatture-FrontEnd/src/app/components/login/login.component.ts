import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faFileInvoice } from '@fortawesome/free-solid-svg-icons';
import { LoginService } from 'src/app/services/loginService';
import { PasswordEncrypterService } from 'src/app/services/passwordEncrypterService';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  faFileInvoice = faFileInvoice;
  username:string = '';
  password:string = '';
  loginResponse = '';

  constructor(private loginService : LoginService, private router : Router) { }

  ngOnInit(): void {
  }

  submit(){
    //Get data
    this.loginService.login(this.username, this.password).subscribe(data => {
      //Set token
      localStorage.setItem(environment.tokenName, data.accessToken);
      //Redirect to root
      this.router.navigate(['/']);
    }, error => {
      switch (error.status){
        case 400:
          this.loginResponse = "Nome utente o password errati.";
          break;
        default:
          this.loginResponse = "Impossibile contattare il server, prova più tardi.";
          break; 
      }
    });
  }

}
