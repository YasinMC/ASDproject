import { Component, OnInit } from '@angular/core';
import { ExportCsvService } from './export-csv.service';
import { CookieService } from 'ngx-cookie-service';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import { ReportFormService } from '../report-form/report-form.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-export-csv',
  templateUrl: './export-csv.component.html',
  styleUrls: ['./export-csv.component.css']
})
export class ExportCsvComponent implements OnInit {
  complaints: any;
  complaint: any;
  token: any;
  status: any;
  displayPopUp: any = "none";

  //centre options
  centres: any;
  sCentre: any;
  centreOption: any;
  centrePicked: boolean = false;
  admin: any;
  alert: any;

  reportForm = new FormGroup({
    dateOfComp: new FormControl(),
    incidentType: new FormControl(),
    centreLocation: new FormControl(),
    storeLocation: new FormControl(),
    incidentDate: new FormControl(),
    compDetails: new FormControl(),
    desiredOutcome: new FormControl(),
  })

  constructor(private api:ReportFormService, private complaintsAPI: ExportCsvService, private cookieService: CookieService, private authService: AuthService, private router:Router) { }

  ngOnInit(): void {
    this.fetchCentres();

    this.alert = sessionStorage.getItem('alert');

    //user token
    this.token = this.cookieService.get('access-token') //"614a4a3bd1bd601ebb61fd59"
    this.getFormData();
  }

  async getFormData() {
    this.token = this.cookieService.get('access-token')
    this.admin = await this.authService.verifyAdmin();
    if (this.admin) {
      this.complaintsAPI.showAllComplaints(this.token).subscribe(data => this.complaints = data);
    } else {
      this.complaintsAPI.showUserComplaints({token: this.token}).subscribe(data => this.complaints = data);
    }
  }
  
  //display the pop up window
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
  async updateIncident() {
    this.clearStatus()
    this.token = this.cookieService.get('access-token') 
    this.complaintsAPI.updateIncident(this.token, this.complaint._id, this.reportForm.value)
                      .subscribe(data => this.status = data);
    
    this.admin = await this.authService.verifyAdmin();
    
    if (this.admin) {
      this.complaintsAPI.showAllComplaints(this.token).subscribe(data => this.complaints = data);
    } else {
      this.complaintsAPI.showUserComplaints({token: this.token}).subscribe(data => this.complaints = data);
    }
  }

  //Close the pop up window
  closeUpdateForm() {
    this.clearStatus()
    this.displayPopUp = "none";
  }
  deleteIncident(incidentId) {
    this.clearStatus();
    console.log(incidentId)
    this.token = this.cookieService.get('access-token')
    this.complaintsAPI.deleteUserComplaint(incidentId, this.token).subscribe(data => this.status = data)
    this.getFormData();
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
    this.centrePicked = true;
  }
  clearStatus(){
    this.status = null;
  }
  back(){
    this.router.navigate(['dashboard'])
  }
  close(){
    sessionStorage.setItem('alert', '');
    this.status = '';
  }
  
}
