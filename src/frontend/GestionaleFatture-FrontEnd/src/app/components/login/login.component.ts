import { Component, OnInit } from '@angular/core';
import { faFileInvoice } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  faFileInvoice = faFileInvoice;

  constructor() { }

  ngOnInit(): void {
  }

}
