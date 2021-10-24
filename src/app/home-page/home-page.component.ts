import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  page: any;
  logStatus:any;
  constructor() { }

  ngOnInit(): void {
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
