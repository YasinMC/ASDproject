import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewIdService {

  constructor(private http: HttpClient) { }

  createNewId(staff, token) {
    staff.token = token;
    return this.http.post("http://20.37.255.79:3500/addEmployee", staff);

  }
}
