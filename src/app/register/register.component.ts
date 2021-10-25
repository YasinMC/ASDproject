import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from './register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  status: any;
  alert: any;
  constructor(private api: RegisterService, private router: Router) { }

  ngOnInit(): void {
  }
  //eid: new FormControl('', [Validators.pattern(/^[0-9]*$/)])
  registerForm = new FormGroup({
    fName: new FormControl('',[Validators.required]),
    lName: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]{1,}$/)]),
    password: new FormControl('', [Validators.required,Validators.minLength(8)])
  })
  
  register(){
    this.api.register(this.registerForm.value).subscribe(data => {
      this.status = data;
      if(this.status.status == 'added user') {
        sessionStorage.setItem('alert', 'register success');
        this.router.navigate(['login']);
      }else{
        this.alert = 'register failed';
        sessionStorage.setItem('alert', 'register failed')
      }
    });
  }

  back(){
    this.router.navigate(['']);
  }
  close(){
    this.alert = '';
  }

}
