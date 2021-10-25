import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExportCsvService {

  constructor(private http: HttpClient) { }


  showUserComplaints(user){
    return this.http.post("https://20.37.255.79:3500/fetchComplaints", user);
  }

  showAllComplaints(token) {
    return this.http.post("https://20.37.255.79:3500/allComplaints", {token: token});
  }

  fetchUserComplaint(complaintId, token) {
    return this.http.post("https://20.37.255.79:3500/fetchComplaint", {complaintId: complaintId, token: token})
  }

  updateIncident(token, id, update) {
    console.log("token = ", token, "| id = ", id, "| update = " , update)
    return this.http.post("https://20.37.255.79:3500/updateComplaint", 
    {
      token: token, 
      id: id, 
      update: update
    })
  }

  deleteUserComplaint(complaintId, token){
    return this.http.post('http://20.37.255.79:3500/deleteComplaint', {complaintId: complaintId, token: token})
  }
}
