import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { NewIdService } from './new-id.service';
import { ReportFormService } from '../report-form/report-form.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-id',
  templateUrl: './new-id.component.html',
  styleUrls: ['./new-id.component.css']
})
export class NewIdComponent implements OnInit {

  newIdForm = new FormGroup({
    eid: new FormControl(''),
    fName: new FormControl(''),
    lName: new FormControl(''),
    storeId: new FormControl(''),
    centreId: new FormControl(''),
  })

  status: any;
  centres: any;
  centreOption: any;
  sCentre: any;
  centrePicked: any;
  token: any;

  constructor(private router:Router, private cookieService: CookieService, private idService: NewIdService, private api: ReportFormService) { }

  ngOnInit(): void {
    this.fetchCentres();
  }

  addID() {
    this.token = this.cookieService.get('access-token');
    this.idService.createNewId(this.newIdForm.value, this.token).subscribe(data => this.status = data);
  }

  fetchCentres(){
    const token = this.cookieService.get('access-token');
    this.api.fetchStores(token).subscribe(data => {
      this.centres = data;
      console.log(this.centres)
    });
  }

  changeCentre(){
    this.centreOption = this.newIdForm.get("centreId").value;
    this.fetchStores();
  }

  fetchStores(){
    //fetch user option from form
    var centreOption = this.centreOption;

    //find all stores in centre
    this.sCentre = this.centres.find((centre) => centre.name == centreOption)
    this.centrePicked = true;
  }
  back(){
    this.router.navigate(['dashboard']);
  }
}
