import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DeleteUserService } from './delete-user.service';


@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {
  status: any;
  alert: any;
  constructor(private api: DeleteUserService, private router:Router) { }
  deleteForm = new FormGroup({
    eid: new FormControl('' , [Validators.pattern(/^[0-9]*$/)])
})
  ngOnInit(): void {
  }

  register(){
    this.api.deleter(this.deleteForm.value).subscribe(data => {
      this.status = data;
      if(this.status.status == 'delete user') {
        sessionStorage.setItem('alert', 'delete success');
        this.router.navigate(['dashboard']);
      }else{
        this.alert = 'delete failed';
        sessionStorage.setItem('alert', 'delete failed')
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
