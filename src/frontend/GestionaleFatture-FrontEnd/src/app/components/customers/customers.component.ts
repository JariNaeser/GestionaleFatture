import { Component, OnInit } from '@angular/core';
import { faPlus, faCog } from '@fortawesome/free-solid-svg-icons';
import { CustomersService } from 'src/app/services/customersService';

declare var $ :any;

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  faPlus = faPlus;
  faCog = faCog;
  companies;
  privatePersons;

  constructor(private customersService : CustomersService) { }

  ngOnInit(): void {
    this.getCompanies();
    this.getPrivatePersons();
  }

  addCompany(){
    
    this.getCompanies();
  }

  addPrivatePerson(){

    this.getPrivatePersons();
  }

  getCompanies(){
    this.customersService.getCompanies().subscribe(data => {
        this.companies = data;
      }, error => {
        console.log(error);
      }
    );
  }

  getPrivatePersons(){
    this.customersService.getPrivatePersons().subscribe(data => {
        this.privatePersons = data;
      }, error => {
        console.log(error);
      }
    );
  }

  findCompanyById(id : number){
    return this.companies.find(element => element.id == id);
  }

}
