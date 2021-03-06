import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ReportFormService } from './report-form.service';

@Component({
  selector: 'app-report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.css']
})
export class ReportFormComponent implements OnInit {
  URL = 'http://localhost:3500'
  dateTime = new Date()
  currentdate:any = formatDate(this.dateTime, 'dd-MM-yyyy', 'en-US')
  centres: any;
  sCentre: any;
  centreOption: any;
  status: any;
  alert: any;
  displayPopUp1: any;
  offender: any;
  offenders: any;

  constructor(private cookieService: CookieService, private api:ReportFormService, private router:Router) { }
  reportForm = new FormGroup({
    dateOfComp: new FormControl(this.currentdate),
    incidentType: new FormControl(),
    centreLocation: new FormControl(),
    storeLocation: new FormControl(),
    incidentDate: new FormControl(),
    compDetails: new FormControl(),
    offenderId: new FormControl('no offenders'),
    desiredOutcome: new FormControl(),
  })

  offenderForm = new FormGroup({
    fName: new FormControl(),
    lName: new FormControl(),
    description: new FormControl()
  })

  ngOnInit(): void {
    this.reportForm.get('storeLocation').disable();
    this.fetchCentres();
    this.fetchOffenders();
  }

  onClickSubmit() {
    let form = this.reportForm.value;
    
    if(this.offender){
      this.reportForm.controls['offenderId'].setValue(this.offender.offenderId)
      form = this.reportForm.value;
    }

    const token = this.cookieService.get('access-token');
    this.api.submitComplaint(token, form).subscribe(data => {
      this.status = data;
      console.log(this.status.status);
      if(this.status.status != 'incident reported'){
        this.alert = this.status.status;
      }else{
        sessionStorage.setItem('alert', 'reported incident successfully');
        this.router.navigate(['csv']);
      }
    });
  }
  fetchCentres(){
    const token = this.cookieService.get('access-token');
    this.api.fetchStores(token).subscribe(data => {
      this.centres = data;
      console.log(this.centres)
    });
  }
  fetchOffenders(){
    const token = this.cookieService.get('access-token');
    this.api.fetchOffenders(token).subscribe(data => {
      this.offenders = data;
      console.log(this.offenders);
    });

  }
  changeCentre(){
    this.centreOption = this.reportForm.get("centreLocation").value;
    this.fetchStores();
  }
  fetchStores(){
    //fetch user option from form
    var centreOption = this.centreOption;

    //find all stores in centre
    this.sCentre = this.centres.find((centre) => centre.name == centreOption)
    console.log("scentre", this.sCentre);
    this.reportForm.get('storeLocation').enable();
  }
  back() {
    this.router.navigate(['dashboard'])
  }
  close() {
    this.alert = '';
    sessionStorage.setItem('alert', '');
  }

  addOffender(){
    console.log("test");
    this.displayPopUp1 = 'block';
  }
  submitOffender(){
    let token = this.cookieService.get('access-token')
    const formValue = this.offenderForm.value;

    this.api.submitOffender(token, formValue).subscribe(data => this.offender = data);
    console.log(formValue);
  }
  closeAddOffender(){
    this.displayPopUp1 = "none";
  }
}
