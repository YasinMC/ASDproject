import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { guestreportService } from './guestreport.service';

@Component({
  selector: 'app-guestreport',
  templateUrl: './guestreport.component.html',
  styleUrls: ['./guestreport.component.css']
})
export class guestreportComponent implements OnInit {
  URL = 'http://localhost:3500'
  dateTime = new Date()
  currentdate:any = formatDate(this.dateTime, 'dd-MM-yyyy', 'en-US')
  centres: any;
  sCentre: any;
  centreOption: any;
  status: any;
  alert: any;
  displayIncident = true;
  displayInquiry = false;
  displayLostFound = false;
  value = 2; 
  updateForm = false;

  

  constructor(private cookieService: CookieService, private api:guestreportService, private router:Router) { }
  guestreportForm = new FormGroup({
    dateOfComp: new FormControl(this.currentdate),
    incidentType: new FormControl(),
    centreLocation: new FormControl(),
    storeLocation: new FormControl(),
    incidentDate: new FormControl(),
    compDetails: new FormControl(),
    desiredOutcome: new FormControl(),
  })
  ngOnInit(): void {
    this.guestreportForm.get('storeLocation').disable();
    this.fetchCentres();
  }

  onClickSubmit() {
    const form = this.guestreportForm.value;
    const token = this.cookieService.get('access-token');
    this.api.submitGuestComplaint(token, form).subscribe(data => {
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
  changeCentre(){
    this.centreOption = this.guestreportForm.get("centreLocation").value;
    this.fetchStores();
  }
  fetchStores(){
    //fetch user option from form
    var centreOption = this.centreOption;

    //find all stores in centre
    this.sCentre = this.centres.find((centre) => centre.name == centreOption)
    console.log("scentre", this.sCentre);
    this.guestreportForm.get('storeLocation').enable();
  }
  back() {
    this.router.navigate(['dashboard'])
  }
  close() {
    this.alert = '';
    sessionStorage.setItem('alert', '');
  }  

  openID()
  {
    this.updateForm = true;
  }

  closeID(){
    this.updateForm = false;
  }

  LostFound(){
        this.displayLostFound = true;
        this.displayIncident = false;
        this.displayInquiry = false;
  }
  Incident(){
    this.displayLostFound = false;
    this.displayIncident = true;
    this.displayInquiry = false;
}
Inquiry(){
  this.displayLostFound = false;
  this.displayIncident = false;
  this.displayInquiry = true;
}

  
  
}
