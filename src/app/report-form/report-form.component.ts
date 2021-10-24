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

  constructor(private cookieService: CookieService, private api:ReportFormService, private router:Router) { }
  reportForm = new FormGroup({
    dateOfComp: new FormControl(this.currentdate),
    fName: new FormControl(),
    lName: new FormControl(),
    email: new FormControl(),
    incidentType: new FormControl(),
    centreLocation: new FormControl(),
    storeLocation: new FormControl(),
    incidentDate: new FormControl(),
    incidentLocation: new FormControl(),
    compDetails: new FormControl(),
    desiredOutcome: new FormControl(),
    signature: new FormControl(),
  })
  ngOnInit(): void {
    this.reportForm.get('storeLocation').disable();
    this.fetchCentres();
  }

  onClickSubmit() {
    const form = this.reportForm.value;
    const token = this.cookieService.get('access-token');
    this.api.submitComplaint(token, form).subscribe(data => this.status = data);
  }
  fetchCentres(){
    const token = this.cookieService.get('access-token');
    this.api.fetchStores(token).subscribe(data => {
      this.centres = data;
      console.log(this.centres)
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



  async submitComplaint(data): Promise<void> {
    
    data.token = this.cookieService.get("access-token")
    data = JSON.stringify(data);
    await fetch(this.URL + '/api/submitComplaint', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: data, 
    });
}

}
