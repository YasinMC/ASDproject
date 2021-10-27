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
  submitInquiry(token, inquiry){
    return this.http.post("https://20.37.255.79:3500/api/submitInquiry", {token: token, inquiry: inquiry})
  }
}
