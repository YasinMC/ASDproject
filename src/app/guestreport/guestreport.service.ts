import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class guestreportService {

  constructor(private http: HttpClient) { }

  fetchStores(token) {
    return this.http.post("https://20.37.255.79:3500/allStores", {token: token}) 
  }
  submitGuestComplaint(token, complaint){
    return this.http.post("https://20.37.255.79:3500/api/submitGuestComplaint", {token: token, complaint: complaint})
  }
}
