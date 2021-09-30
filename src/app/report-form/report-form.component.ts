import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.css']
})
export class ReportFormComponent implements OnInit {

  URL = 'http://localhost:3500'

  constructor(private cookieService: CookieService) { }

  ngOnInit(): void {
  }

  onClickSubmit(data) {
    this.submitComplaint(data);
  }

  async submitComplaint(data): Promise<void> {
    
    data.token = this.cookieService.get("access-token")
    data = JSON.stringify(data);
    await fetch(this.URL + '/api/submitComplaint', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: data, 
    });
}

}
