import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { StoreManageService } from './store-manage.service';

@Component({
  selector: 'app-store-manage',
  templateUrl: './store-manage.component.html',
  styleUrls: ['./store-manage.component.css']
})
export class StoreManageComponent implements OnInit {
  displayPopUp1: any = "none"
  displayPopUp2: any = "none"
  displayPopUpAddC: any = "none"
  displayPopUpDelC: any = "none"
  centres: any;
  token: any;
  status1: any;
  status2: any;
  statusAC: any;
  statusDC: any;
  test: any;
  centre = {
    stores: [{sName: "loading..."}]
  };

  addForm = new FormGroup({
    sCentre: new FormControl(''),
    sName: new FormControl(''),
    sLocation: new FormControl(''),
    sNumber: new FormControl(''),
  })

  addCForm = new FormGroup({
    cName: new FormControl('')
  })

  deleteCForm = new FormGroup({
    cName: new FormControl('')
  })

  deleteForm = new FormGroup({
    sCentre: new FormControl(''),
    sName: new FormControl('')
  })

  constructor(private router:Router, private cookieService: CookieService, private storeService: StoreManageService) { }

  ngOnInit(): void {
    this.token = this.cookieService.get('access-token')
    this.getData();
  }

  async getData() {
    this.token = this.cookieService.get('access-token')
    this.storeService.fetchAllStores(this.token).subscribe(data => {this.centres = data; console.log(this.centres);});
  }

  addStore() {
    this.displayPopUp1 = "block";
    this.getData();
  }

  addCentre() {
    this.displayPopUpAddC = "block";
    this.getData();
  }

  deleteStore() {
    this.displayPopUp2 = "block"
    this.getData();
  }

  deleteCentre() {
    this.displayPopUpDelC = "block";
    this.getData();
  }

  addStoreSubmit() {
    this.token = this.cookieService.get('access-token')
    this.storeService.addStore({store: this.addForm.value}, this.token).subscribe(data => this.status1 = data);
  }
  
  addCentreSubmit() {
    this.token = this.cookieService.get('access-token')
    this.storeService.addCentre({centre: this.addCForm.value}, this.token).subscribe(data => this.statusAC = data);
  }

  deleteStoreSubmit() {
    this.token = this.cookieService.get('access-token')
    this.storeService.deleteStore({store: this.deleteForm.value}, this.token).subscribe(data => this.status2 = data);
  }

  deleteCentreSubmit() {
    this.token = this.cookieService.get('access-token')
    this.storeService.deleteCentre({centre: this.deleteCForm.value}, this.token).subscribe(data => this.statusDC = data);
  }
  
  changeCentre() {
    this.centre = this.deleteForm.get('sCentre').value;
    this.centres.forEach( (element) => {
      if(element.name == this.centre) {
        this.centre = element
      }
  });
  }


  closeUpdateForm1() {
    this.displayPopUp1 = "none";
  }

  closeUpdateFormAddC() {
    this.displayPopUpAddC = "none";
  }

  closeUpdateFormDelC() {
    this.displayPopUpDelC = "none";
  }

  closeUpdateForm2() {
    this.displayPopUp2 = "none";
  }
  back(){
    this.router.navigate(['dashboard']);
  }
}

/*<select name="del" formControlName="sName">
                <optgroup *ngFor = 'let centre of centres' label="{{centre.name}}">
                    <option *ngFor = 'let store of centre.stores' [value]="store">{{store.sName}}</option> 
                </optgroup>
            </select>*/