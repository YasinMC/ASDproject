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
  email: any;
  inquiry: any;
  displayIncident = false;
  displayInquiry = false;
  displayLostFound = false;
  value = 2; 
  updateForm = false;
  inquiryreportForm: FormGroup;

  

  constructor(private cookieService: CookieService, private api: guestreportService, private router: Router) { 
  this.inquiryreportForm = new FormGroup({
    email: new FormControl(),
    inquiry: new FormControl(),
  });
}
onClickSubmit() {
  const form = this.inquiryreportForm.value;
  const token = this.cookieService.get('access-token');
  this.api.submitInquiry(token, form).subscribe(data => {
    this.status = data;
    console.log(this.status.status);
    if(this.status.status != 'iquiry submitted'){
      this.alert = this.status.status;
    }else{
      sessionStorage.setItem('alert', 'iquiry submitted successfully');
      this.router.navigate(['csv']);
    }
  });

}

  ngOnInit(): void {
    // this.guestreportForm.get('storeLocation').disable();
    // this.fetchCentres();
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
