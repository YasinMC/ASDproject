import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private http: HttpClient, private router: Router, private cookieService: CookieService) { }
  
  AT = this.cookieService.get("access-token");
  auth: any;
  user = new Subject<Boolean>();
  isUser$ = this.user.asObservable();
  admin = new Subject<Boolean>();
  isAdmin$ = this.admin.asObservable();
  
  async verifyToken(AT) {
    //if access token is missing return false
    if(!AT) return {verification: false};
    
    //if token is present send to server for verification 
    return await this.http.post('http://20.37.255.79:3500/verify', {token: AT}).toPromise();
  }

  async verifyUser(){

    this.AT = this.cookieService.get("access-token");
    try {
      //subscribe to auth service to verify token
      this.auth = await this.verifyToken(this.AT);
      this.verifyAdmin();
    } catch (error) {
      console.log("Something went wrong with token verification: " ,error)
    }
    
    if(this.auth.verification){
      this.user.next(true); 
      return true;
    }else{
      this.user.next(false); 
      return false; 
    }
  }

  async verifyAdmin(){

    this.AT = this.cookieService.get("access-token");
    
    try {
      //subscribe to auth service to verify token
      this.auth = await this.verifyToken(this.AT);
    } catch (error) {
      console.log("Something went wrong with token verification: " ,error)
    }

    console.log(this.auth.admin);

    if(this.auth.admin){ 
      this.user.next(false); 
      this.admin.next(true); 
      
      return true;
    }else{
      this.admin.next(false); 
      return false; 
    }
  }
}
