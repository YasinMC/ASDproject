import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserListService {

  user: any;

  constructor(private http: HttpClient) { }

  fetchUsers(token) {
    return this.http.post('http://20.37.255.79:3500/getAllUsers', {token: token});
  }

  fetchUser(userID, token) {
    return this.http.post('http://20.37.255.79:3500/findUserAdmin', {token: token, _id: userID});
  }

  updateUser(userID, token, update) {
    return this.http.post('http://20.37.255.79:3500/updateUserAdmin', {token: token, _id: userID, update: update});
  }

  deleteUser(userID, token) {
    return this.http.post('http://20.37.255.79:3500/deleteUserAdmin', {token: token, _id: userID})
  }

}
