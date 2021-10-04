import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExportCsvService {

  constructor(private http: HttpClient) { }


  showUserComplaints(user){
    return this.http.post("http://localhost:3500/fetchComplaints", user);
  }

  showAllComplaints() {
    return this.http.get("http://localhost:3500/allComplaints");
  }

  fetchUserComplaint(complaintId, token) {
    return this.http.post("http://localhost:3500/fetchComplaint", {complaintId: complaintId, token: token})
  }

  updateIncident(token, id, update) {
    console.log("token = ", token, "| id = ", id, "| update = " , update)
    return this.http.post("http://localhost:3500/updateComplaint", 
    {
      token: token, 
      id: id, 
      update: update
    })
  }

  deleteUserComplaint(complaintId, token){
    return this.http.post('http://localhost:3500/deleteComplaint', {complaintId: complaintId, token: token})
  }
}
