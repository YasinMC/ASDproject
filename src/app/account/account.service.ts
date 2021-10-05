import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  changePassword(token, password){
    const update = {token: token, password}
    update.password = password.password;

    return this.http.post("http://localhost:3500/updateUserPassword", update)
  }
  changeEmail(token, email){
    const update = {token: token, update: email}
    return this.http.post("http://localhost:3500/updateUser", update)
  }
  deleteAcc(token){
    return this.http.post("http://localhost:3500/deleteUser", {token: token})
  }
}
