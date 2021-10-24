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
  constructor(private api: RegisterService, private router: Router) { }

  ngOnInit(): void {
  }
  registerForm = new FormGroup({
    eid: new FormControl('', [Validators.pattern(/^[0-9]*$/)]),
    email: new FormControl('',[Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]{1,}$/)]),
    password: new FormControl('', [Validators.required,Validators.minLength(8)])
  })
  
  register(){
    this.api.register(this.registerForm.value).subscribe(data => this.status = data);
  }

  back(){
    this.router.navigate(['']);
  }

}
