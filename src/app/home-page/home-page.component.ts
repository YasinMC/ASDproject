import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  page: any;
  logStatus:any;
  constructor(private cookieService:CookieService, private router:Router) { }

  ngOnInit(): void {
    const token = this.cookieService.get('access-token');
    console.log(token);
    if(token) this.router.navigate(['dashboard']);

    this.logStatus = sessionStorage.getItem('logStatus');

    this.page = sessionStorage.getItem('page');
    if(!this.page) sessionStorage.setItem('page', "page1");
    this.page = sessionStorage.getItem('page');
    console.log(this.page);
  }

  reportButton() {
    sessionStorage.setItem('page', "page2");
    this.page = sessionStorage.getItem('page');
  }

  loginOrRegister() {
    sessionStorage.setItem('page', "page3");
    this.page = sessionStorage.getItem('page');
  }

  back(){
    if(sessionStorage.getItem('page') == 'page2'){
      sessionStorage.setItem('page', 'page1');
      this.page = sessionStorage.getItem('page');
    } 
    if(sessionStorage.getItem('page') == 'page3'){
      sessionStorage.setItem('page', 'page2');
      this.page = sessionStorage.getItem('page');
    } 
  }
  close(){
    this.logStatus = false;
    this.logStatus = sessionStorage.setItem('logStatus', 'false');
  }


}
