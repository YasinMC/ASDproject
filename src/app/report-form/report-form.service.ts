import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReportFormService {

  constructor(private http: HttpClient) { }

  fetchStores(token) {
    return this.http.post("https://20.37.255.79:3500/allStores", {token: token}) 
  }
  submitComplaint(token, complaint){
    return this.http.post("https://20.37.255.79:3500/api/submitComplaint", {token: token, complaint: complaint})
  }
}
