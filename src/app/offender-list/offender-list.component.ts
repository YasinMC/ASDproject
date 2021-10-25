import { Component, OnInit } from '@angular/core';
import { OffenderListService } from './offender-list.service';
import { CookieService } from 'ngx-cookie-service';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { ExportCsvService } from '../export-csv/export-csv.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-offender-list',
  templateUrl: './offender-list.component.html',
  styleUrls: ['./offender-list.component.css']
})
export class OffenderListComponent implements OnInit {
  token: any;
  status: any;
  displayPopUp: any = "none";
  admin: any;
  offenders: any;
  offender: any;
  complaint: any;

  reportForm = new FormGroup({
    dateOfComp: new FormControl(''),
    fName: new FormControl(''),
    lName: new FormControl(''),
    email: new FormControl(''),
    sAddress: new FormControl(''),
    sAddress2: new FormControl(''),
    city: new FormControl(''),
    region: new FormControl(''),
    pCode: new FormControl(''),
    sLocation: new FormControl(''),
    date: new FormControl(''),
    name: new FormControl(''), //INCIDENT LOCATION
    compDetails: new FormControl(''),
    desiredOutcome: new FormControl(''),
    signature: new FormControl(''),
  })

  constructor(private cookieService: CookieService, private offenderService: OffenderListService, private authService: AuthService, private complaintsAPI: ExportCsvService,private router:Router) { }

  ngOnInit(): void {
    this.token = this.cookieService.get('access-token')
    this.getOffenders();
  }

  async getOffenders() {
    this.token = this.cookieService.get('access-token')
    //this.admin = await this.authService.verifyAdmin();
    await this.offenderService.getAllOffenders(this.token).subscribe(data => {this.offenders = data; console.log(data);});

  }

  updateForm(incidentId) {
    this.token = this.cookieService.get('access-token')
    this.complaintsAPI.fetchUserComplaint(incidentId, this.token).subscribe(data => {
      this.complaint = data;

      for(var property in this.complaint){
        //continue loop if property is equal to id, user or userId.
        if(['_id', 'user', 'userId'].includes(property)) continue;

        //loop data over to the form
        this.reportForm.controls[property].setValue(this.complaint[property]);

        //console.log("property = ", property, "Value in property = ", this.reportForm.controls[property].value)
      }
    });

    this.displayPopUp = "block";
  }

  updateIncident() {
    this.token = this.cookieService.get('access-token')
    this.complaintsAPI.updateIncident(this.token, this.complaint._id, this.reportForm.value)
                      .subscribe(data => this.status = data);
  }

  //Close the pop up window
  closeUpdateForm() {
    this.displayPopUp = "none";
  }
  back(){
    this.router.navigate(['dashboard']);
  }

}
