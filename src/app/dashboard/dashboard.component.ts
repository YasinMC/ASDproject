import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  alert:any;
  constructor(private router:Router, private cookieService:CookieService) { }

  ngOnInit(): void {
  }
  back(){
    this.router.navigate(['']);
  }
  logout(){
    this.cookieService.delete('access-token');
    this.router.navigate(['']);
    sessionStorage.setItem('page', 'page1');
    sessionStorage.setItem('logStatus', 'loggedOff');
  }
}
