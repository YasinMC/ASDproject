import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  header: any;

  constructor(private http: HttpClient) { }

  //login user
  login(user){
    return this.http.post('https://20.37.255.79:3500/login', user);
  }
  
  //register user
  async register(user){
    return this.http.post('https://20.37.255.79:3500/register', user);
  }

  //verify that tokens are valid
  async verify(AT){ 
    if(!AT) this.header = { "access-token": '' }

    return await this.http.get('https://20.37.255.79:4100/verify', { 
      headers: this.header
    }).toPromise();
  }
}
