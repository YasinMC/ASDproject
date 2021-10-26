import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class DeleteUserService {

  constructor(private http: HttpClient) { }

  deleter(User){
    return this.http.post("https://20.37.255.79:3500/deleter", User)
  }
}
