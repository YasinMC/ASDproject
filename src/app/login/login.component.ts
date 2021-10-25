import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  URL = 'http://localhost:3500';
  user: any;
  alert: any;
  constructor(private authService: AuthService, private loginService: LoginService, private cookieService: CookieService, private router: Router) { }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]{1,}$/)]),
    password: new FormControl('',  [Validators.required,Validators.minLength(8)])
  })

  ngOnInit(): void {
    this.alert = sessionStorage.getItem('alert');
  }

  async login(){
    const data = this.loginForm.value;
    //call login service with user data
    this.loginService.login(data).subscribe(data => {
      this.user = data;
      this.cookieService.set('access-token', this.user.AT);

      if(this.user.status == 'success'){
        this.alert = 'success';
      }else{
        this.alert = 'loginFailed';
      }

      if(this.user.AT){
        this.authService.verifyUser();
        this.router.navigate(['dashboard']);
        //update user login status
      } 
    });
  }

  back(){
    this.router.navigate(['']);
  }
  close(){
    this.alert = '';
    sessionStorage.setItem('alert', '');
  }
}
