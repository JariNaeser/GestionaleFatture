import { Component, OnInit } from '@angular/core';
import { faPlus, faCog, faTrashAlt, faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { CustomersService } from 'src/app/services/customersService';
import { environment } from 'src/environments/environment.prod';

declare var $ :any;

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})

export class CustomersComponent implements OnInit {
  // Icons
  faPlus = faPlus;
  faCog = faCog;
  faTrashAlt = faTrashAlt;
  faCircleCheck = faCircleCheck;
  faCircleXmark = faCircleXmark;
  // General
  companies;
  privatePersons;
  environment = environment;
  isAddCompanyOk = Array(7);
  isAddPrivatePersonOk = Array(7);
  // Add company modal
  addCompanyDisabled = true;
  addCompanyName;
  addCompanyPhoneNumber;
  addCompanyStreet;
  addCompanyStreetNumber;
  addCompanyPostalCode;
  addCompanyCity;
  addCompanyCountry;
  addCompanyIcon;
  addCompanyWebsite;

  // Add private person modal
  addPrivatePersonDisabled = true;

  constructor(private customersService : CustomersService) { }

  ngOnInit(): void {
    this.isAddCompanyOk.fill(false);
    this.isAddPrivatePersonOk.fill(false);
    this.getCompanies();
    this.getPrivatePersons();
  }

  addCompany(){
    //Get input data
    this.customersService.addCompany({
      companyName: this.addCompanyName,
      companyPhoneNumber: this.addCompanyPhoneNumber,
      companyStreet: this.addCompanyStreet,
      companyStreetNumber: this.addCompanyStreetNumber,
      companyPostalCode: this.addCompanyPostalCode,
      companyCity: this.addCompanyCity,
      companyCountry: this.addCompanyCountry,
      companyIcon: this.addCompanyIcon ? this.addCompanyIcon : environment.noIconFileName,
      companyWebsite: this.addCompanyWebsite ? this.addCompanyWebsite : 'no_website'
    }).subscribe(data => {
      $('#aziendaSuccessAlert').css('display', 'block');
    }, error => {
      $('#aziendaErrorAlert').css('display', 'block');
    });
    $('#addCompanyModal').modal('hide');
    this.getCompanies();
  }

  addPrivatePerson(){
    // TODO
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

  validate(value:string, regex:string, inputNumber:number, type:string){
    var reg = new RegExp(regex);
    if(type == 'addCompany'){
      if(regex === null){
        //Password case
        this.isAddCompanyOk[3] = value.length > 0; 
      }else{
        this.isAddCompanyOk[inputNumber] = (value != undefined && value.length > 0 && reg.test(value));
      }
      this.addCompanyDisabled = !this.addCompanyInputsOk();
    }else if(type == 'addPrivatePerson'){
      if(regex === null){
        //Password case
        this.isAddPrivatePersonOk[3] = value.length > 0; 
      }else{
        this.isAddPrivatePersonOk[inputNumber] = (value != undefined && value.length > 0 && reg.test(value));
      }
      this.addPrivatePersonDisabled = !this.addPrivatePersonInputsOk();
    }
  }

  addCompanyInputsOk(){
    return !this.isAddCompanyOk.includes(false);
  }

  addPrivatePersonInputsOk(){
    return !this.isAddCompanyOk.includes(false);
  }

}
