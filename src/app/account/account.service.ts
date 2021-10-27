import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  findUser(token){
    return this.http.post("http://20.37.255.79:3500/findUser", {token: token})
  }

  changePassword(token, password){
    const update = {token: token, password}
    update.password = password.password;
    return this.http.post("http://20.37.255.79:3500/updateUserPassword", update)
  }
  changeEmail(token, email){
    const update = {token: token, update: email}
    return this.http.post("http://20.37.255.79:3500/updateUser", update)
  }
  deleteAcc(token){
    return this.http.post("http://20.37.255.79:3500/deleteUser", {token: token})
  }
}
