import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { RegisterService } from '../register/register.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  status: any;
  constructor(private api: RegisterService, private cookieService: CookieService, private router:Router) { }
  registerForm = new FormGroup({
    eid: new FormControl('' , [Validators.pattern(/^[0-9]*$/)]),
    email: new FormControl('',[Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]{1,}$/)]),
    password: new FormControl('', [Validators.minLength(8), Validators.required]),
    admin: new FormControl(false)
  })
  ngOnInit(): void {
  }

  register(){
    const token = this.cookieService.get("access-token");
    this.api.registerAdmin(this.registerForm.value, token).subscribe(data => this.status = data);
  }

  back(){
    this.router.navigate(['dashboard']);
  }

}
