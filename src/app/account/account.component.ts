import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnyBulkWriteOperation } from 'mongodb';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../auth/auth.service';
import { AccountService } from './account.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  user: any;
  users: any;
  
  constructor(private api:AccountService, private cookieService: CookieService, private router: Router, private authService: AuthService) { }
  status: any;
  displayPopUp1: any = "none";
  displayPopUp2: any = "none";
  displayPopUp3: any = "none";
  
  ngOnInit(): void {
  }


  changeEmail(email){
    const token = this.cookieService.get("access-token");
    this.api.changeEmail(token, email).subscribe(data => this.status = data);
  }
  changePassword(password){
    const token = this.cookieService.get("access-token");
    this.api.changePassword(token, password).subscribe(data => this.status = data);
  }
  deleteAcc(){
    const token = this.cookieService.get("access-token");
    this.api.deleteAcc(token).subscribe(data => {
      this.status = data;
      if(this.status.status == "user deleted"){
        this.cookieService.delete('access-token');
        this.authService.verifyAdmin();
        this.authService.verifyUser();
        window.location.reload();
      }
    });
  }

  emailChangePopUp(){
    this.displayPopUp1 = "block";
  }
  passChangePopUp(){
    this.displayPopUp2 = "block";
  }
  closeUpdateForm(){
    this.displayPopUp1 = "none";
  }
  closepassUpdateForm(){
    this.displayPopUp2 = "none";
  }
  deleteAccountPopUp(){
    this.displayPopUp3 = "block";
  }
  closeDeleteAccountPopUp(){
    this.displayPopUp3 = "none";
  }
  back(){
    this.router.navigate(['dashboard']);
  }
}
