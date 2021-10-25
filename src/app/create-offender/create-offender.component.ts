import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CreateOffenderService } from './create-offender.service';

@Component({
  selector: 'app-create-offender',
  templateUrl: './create-offender.component.html',
  styleUrls: ['./create-offender.component.css']
})
export class CreateOffenderComponent implements OnInit {
  status: any;
  token: any;
  constructor(private cookieService: CookieService, private createOffenderService: CreateOffenderService, private router:Router) { }

  ngOnInit(): void {
  }

  createNewOffender(offender){
    const token = this.cookieService.get("access-token");
    this.createOffenderService.createOffender(offender).subscribe(data => this.status = data);
  }
  back(){
    this.router.navigate(['dashboard']);
  }
}
