import { Component, OnInit } from '@angular/core';
import { faPlus, faCog } from '@fortawesome/free-solid-svg-icons';

declare var $ :any;

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  faPlus = faPlus;
  faCog = faCog;

  constructor() { }

  ngOnInit(): void {
    
  }

  addCompany(){
    
  }

  addPrivatePerson(){

  }

}
