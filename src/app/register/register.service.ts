import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  constructor(private http: HttpClient) { }

  register(newUser){
    return this.http.post("http://localhost:3500/register", newUser)
  }
  registerAdmin(newUser, token){
    console.log(token, newUser)
    return this.http.post("http://localhost:3500/registerAdmin", {token: token, newUser: newUser})
  }
}
