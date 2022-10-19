import { Component, OnInit } from '@angular/core';
import { faPlus, faCog } from '@fortawesome/free-solid-svg-icons';
import { CustomersService } from 'src/app/services/customersService';
import { environment } from 'src/environments/environment.prod';

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
  environment = environment;

  constructor(private customersService : CustomersService) { }

  ngOnInit(): void {
    this.getCompanies();
    this.getPrivatePersons();
  }

  addCompany(){
    //Get input data

    //Split icon path
    var splitted = $('[name=companyIcon]').val().split('\\');

    var addCompanyData = {
      companyName: $('[name=companyName]').val(),
      companyPhoneNumber: $('[name=companyPhoneNumber]').val(),
      companyStreet: $('[name=companyStreet]').val(),
      companyStreetNumber: $('[name=companyStreetNumber]').val(),
      companyPostalCode: $('[name=companyPostalCode]').val(),
      companyCity: $('[name=companyCity]').val(),
      companyCountry: $('[name=companyCountry]').val(),
      companyIcon: (splitted.length > 0) ? splitted[splitted.length - 1] : splitted[0],
      companyWebsite: $('[name=companyWebsite]').val()
    }
    this.customersService.addCompany(addCompanyData);
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
