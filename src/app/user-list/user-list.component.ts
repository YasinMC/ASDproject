import { Component, OnInit } from '@angular/core';
import { UserListService } from './user-list.service';
import { CookieService } from 'ngx-cookie-service';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  token: any;
  status: any;
  displayPopUp: any = "none";
  admin: any;
  users: any;
  user: any;

  userForm = new FormGroup({
    eid: new FormControl(''),
    email: new FormControl(''),
  })

  constructor(private router:Router,private cookieService: CookieService, private userService: UserListService, private authService: AuthService) { }

  ngOnInit(): void {
    this.token = this.cookieService.get('access-token') 
    this.getUserData();
  }

  async getUserData() {
    this.token = this.cookieService.get('access-token')
    this.admin = await this.authService.verifyAdmin();
    if (this.admin) {
      await this.userService.fetchUsers(this.token).subscribe(data => {this.users = data;});
    } else {
      this.users = "Only for Admins!"
    }
  }

  closeUpdateForm() {
    this.displayPopUp = "none";
  }

  updateForm(userID) {
    this.token = this.cookieService.get('access-token'); 
    this.userService.fetchUser(userID, this.token).subscribe(data => {
      this.user = data;
      this.userForm.controls["eid"].setValue(this.user["eid"]);
      this.userForm.controls["email"].setValue(this.user["email"]);
        
    });
      this.displayPopUp = "block";
  }

  updateUser(userID) {
    this.token = this.cookieService.get('access-token') 
    this.userService.updateUser(userID, this.token, this.userForm.value)
                      .subscribe(data => this.status = data);
    this.getUserData();
  }

  deleteUser(userID) {
    this.token = this.cookieService.get('access-token')
    this.userService.deleteUser(userID, this.token).subscribe(data => this.status = data)
    this.getUserData();
  }
  back(){
    this.router.navigate(['dashboard']);
  }

}
